import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../../prisma/prisma.service';
import { R } from '../../../../../common/R';
import * as path from 'node:path';
import * as fs from 'node:fs';
import { base } from '../../../../../util/base';
import {
  FileChunkDto,
  FileDto,
  FileSelListDto,
  FileUploadOneChunk_check,
  FileUploadOneChunk_merge,
  FileUploadOneChunk_upload,
} from './dto';
import { BaseContextService } from '../../../../base-context/base-context.service';
import { saveFile } from '../../../../../util/FileUtils';
import { Exception } from "../../../../../exception/exception";
import { UnknownException } from "../../../../../exception/unknown.exception";
import { serverConfig } from "@ms/config";
import { idUtils, timeUtils } from "@ms/common";
import { WinstonService } from "../../../../winston/winston.service";

const SparkMD5 = require('spark-md5');

@Injectable()
export class FileUploadService {
  private env: ReturnType<typeof serverConfig.currentConfig>;
  private directoryPrefix = 'YYYY/MM/DD/';

  constructor(
    private readonly prisma: PrismaService,
    private readonly bcs: BaseContextService,
    private readonly winston: WinstonService,
  ) {
    this.env = serverConfig.currentConfig();
    this.bcs.setFieldSelectParam('tbl_file', {
      notNullKeys: ['fileName', 'fileNewName', 'fileSize', 'fileMd5', 'ifChunk', 'chunkNum', 'ifMerge', 'ifFirst', 'ifFinished', 'module'],
      numberKeys: ['fileSize', 'chunkNum'],
    });
    this.bcs.setFieldSelectParam('tbl_file_chunk', {
      notNullKeys: ['fileName', 'fileNewName', 'fileSize', 'fileMd5', 'ifChunk', 'chunkNum', 'ifMerge', 'ifFirst', 'ifFinished', 'module'],
      numberKeys: ['fileSize', 'chunkNum'],
      ifUpdateRole: false,
      ifUpdateBy: false,
      ifUpdateTime: false,
    });
  }

  async selList(dto: FileSelListDto): Promise<R> {
    const data = await this.prisma.findPage<FileDto, FileSelListDto>('tbl_file', {
      data: dto,
      orderBy: {
        createTime: 'desc',
      },
    });
    for (let i = 0; i < data.list.length; i++) {
      if (data.list[i].ifChunk === base.Y && data.list[i].ifMerge === base.N) {
        const count = await this.prisma.count('tbl_file_chunk', {
          data: {
            fileMd5: data.list[i].fileMd5,
            ifFinished: base.Y,
          },
        });
        data.list[i]['uploadedCount'] = count;
      }
    }
    return R.ok(data);
  }

  async fileUploadOneFull(file, {
                            fileName = '',
                            module = null,
                          }: {
                            fileName?: string
                            module?: string | null
                          } = {},
  ): Promise<R> {
    try {
      const fileName2 = fileName || file.originalname;
      const fileMd5 = SparkMD5.hash(file.buffer);
      // 如果已有相同文件，则不用上传了
      const sameFile = await this.prisma.findFirst<FileDto>('tbl_file', {
        // fileName: fileName2,
        fileMd5: fileMd5,
        ifChunk: base.N,
        ifFinished: base.Y,
      });
      const fileSize = file.size;
      const fileSuffix = fileName2.substring(fileName2.lastIndexOf('.'));
      const fileUUID = idUtils.randomUUID();
      const s = timeUtils.formatDate(new Date(), { format: this.directoryPrefix, ifUseUTC: true });
      const fileNewName1 = fileUUID + fileSuffix;
      const fileNewName2 = s + fileNewName1;
      const fillObj = {
        fileName: fileName2,
        fileNewName: fileNewName2,
        fileSize: BigInt(fileSize),
        fileMd5: fileMd5,
        ifChunk: base.N,
        ifFirst: base.Y,
        ifFinished: base.N,
        module: module,
      };
      if (sameFile) {
        // 如果已有相同文件，直接存库
        fillObj.fileNewName = sameFile.fileNewName;
        fillObj.fileSize = BigInt(sameFile.fileSize);
        fillObj.ifFirst = base.N;
        fillObj.ifFinished = base.Y;
        await this.prisma.create<FileDto>('tbl_file', fillObj);
      } else {
        // 如果无相同文件，先存下库，ifFinished字段设为false，然后存文件，最后更新库
        const newVar = await this.prisma.create<FileDto>('tbl_file', fillObj);
        saveFile(this.env.file.uploadPath, fileNewName1, file.buffer, { a: s });
        await this.prisma.updateById<FileDto>('tbl_file', {
          id: newVar.id,
          ifFinished: base.Y,
        });
      }
      return R.ok(fillObj.fileNewName);
    } catch (e) {
      console.error(e);
      this.winston.error(e);
      throw new UnknownException(this.bcs.getUserData().reqId, e as HttpException);
    }
  }

  async fileUploadOneChunkCheck(dto: FileUploadOneChunk_check): Promise<R> {
    const fileName = dto.fileName;
    const fileSuffix = fileName.substring(fileName.lastIndexOf('.'));
    const fileUUID = idUtils.randomUUID();
    const s = timeUtils.formatDate(new Date(), { format: this.directoryPrefix, ifUseUTC: true });
    const fileNewName1 = fileUUID + fileSuffix;
    const fileNewName2 = s + fileNewName1;
    const sameFile = await this.prisma.findAll<FileDto>('tbl_file', {
      data: {
        // fileName: dto.fileName,
        fileMd5: dto.fileMd5,
        ifChunk: base.Y,
        deleted: base.N,
      },
    });
    if (sameFile.length > 0) {
      // 已存在
      // 是否合并
      let b = true;
      for (const sameFileElement of sameFile) {
        if (sameFileElement.ifMerge === base.N) {
          b = false;
        }
      }
      const sameFileElement1 = sameFile[0];
      if (b) {
        // 已合并
        // 保存文件信息至数据库
        const fillObj = {
          fileName: fileName,
          fileNewName: sameFileElement1.fileNewName,
          fileSize: BigInt(sameFileElement1.fileSize),
          fileMd5: sameFileElement1.fileMd5,
          ifChunk: base.Y,
          chunkNum: sameFileElement1.chunkNum,
          ifFirst: base.N,
          ifMerge: base.Y,
          ifFinished: base.Y,
        };
        await this.prisma.create<FileDto>('tbl_file', fillObj);
        return R.ok({ merge: true });
      } else {
        // 未合并
        // 保存文件信息至数据库
        const fillObj = {
          fileName: fileName,
          fileNewName: sameFileElement1.fileNewName,
          fileSize: BigInt(sameFileElement1.fileSize),
          fileMd5: sameFileElement1.fileMd5,
          ifChunk: base.Y,
          chunkNum: sameFileElement1.chunkNum,
          ifFirst: base.N,
          ifMerge: base.N,
          ifFinished: base.N,
        };
        await this.prisma.create<FileDto>('tbl_file', fillObj);
        const findMany = await this.prisma.findAll<FileChunkDto>('tbl_file_chunk', {
          data: {
            fileNewName: sameFileElement1.fileNewName,
            fileMd5: dto.fileMd5,
            ifFinished: base.Y,
            deleted: base.N,
          },
        });
        return R.ok({
          merge: false,
          count: findMany.length,
          fileNewName: sameFileElement1.fileNewName,
          uploadedIndexs: findMany.map(item => item.chunkIndex),
        });
      }
    } else {
      // 不存在，保存文件信息至数据库
      const fillObj = {
        fileName: fileName,
        fileNewName: fileNewName2,
        fileSize: BigInt(dto.fileSize),
        fileMd5: dto.fileMd5,
        ifChunk: base.Y,
        chunkNum: dto.chunkNum,
        ifFirst: base.Y,
        ifMerge: base.N,
        ifFinished: base.N,
      };
      await this.prisma.create<FileDto>('tbl_file', fillObj);
      return R.ok({
        merge: false,
        count: 0,
        fileNewName: fileNewName2,
        uploadedIndexs: [],
      });
    }
  }

  async fileUploadOneChunkUpload(dto: FileUploadOneChunk_upload): Promise<R> {
    dto.chunkIndex = Number(dto.chunkIndex);
    try {
      const s = timeUtils.formatDate(new Date(), { format: this.directoryPrefix, ifUseUTC: true });
      const chunkName1 = idUtils.randomUUID();
      const chunkName2 = s + chunkName1;
      // 保存文件信息至数据库
      const info = await this.prisma.create<FileChunkDto>('tbl_file_chunk', {
        fileMd5: dto.fileMd5,
        fileNewName: dto.fileNewName,
        chunkName: chunkName2,
        chunkIndex: dto.chunkIndex,
        ifFinished: base.N,
      });
      // 保存文件
      saveFile(this.env.file.uploadPath, chunkName1, dto.file.buffer, { a: s });
      // 更新文件信息
      await this.prisma.updateById<FileChunkDto>('tbl_file_chunk', {
        id: info.id,
        ifFinished: base.Y,
      });
      return R.ok(true);
    } catch (e) {
      console.error(e);
      this.winston.error(e);
      throw new UnknownException(this.bcs.getUserData().reqId, e as HttpException)
    }
  }

  async fileUploadOneChunkMerge(dto: FileUploadOneChunk_merge): Promise<R> {
    const fileInfos = await this.prisma.findAll<FileDto>('tbl_file', {
      data: {
        fileNewName: dto.fileNewName,
        fileMd5: dto.fileMd5,
        deleted: base.N,
      },
    });
    const fileInfo = fileInfos[0];
    const chunks = await this.prisma.findAll<FileChunkDto>('tbl_file_chunk', {
      data: {
        fileNewName: fileInfo.fileNewName,
        fileMd5: fileInfo.fileMd5,
      },
      orderBy: {
        chunkIndex: 'asc',
      },
    });
    if (chunks.length !== fileInfo.chunkNum) {
      throw new Exception('合并失败，请重试。');
    }
    const outputFile = path.join(this.env.file.uploadPath, fileInfo.fileNewName);
    const outputFd = fs.openSync(outputFile, 'w');
    // 创建一个 Promise 数组，每个 Promise 处理一个文件块的写入
    const promises = chunks.map((chunk) => {
      const file = path.join(this.env.file.uploadPath, chunk.chunkName);
      const inputFd = fs.openSync(file, 'r');
      const buffer = Buffer.alloc(4096); // 4KB 缓冲区，你可以根据实际情况调整大小
      function write() {
        const bytesRead = fs.readSync(inputFd, buffer, 0, buffer.length, null);
        if (bytesRead > 0) {
          fs.writeSync(outputFd, buffer, 0, bytesRead, null);
          write();
        }
      }

      return new Promise((resolve, reject) => {
        write();
        fs.closeSync(inputFd);
        resolve(true);
      });
    });
    // 使用 Promise.all 等待所有写入操作完成
    Promise.all(promises)
      .then(() => {
        fs.closeSync(outputFd);
      })
      .catch((error) => {
        console.error('Error while processing file chunks:', error);
        this.winston.error(error);
      });
    for (let i = 0; i < fileInfos.length; i++) {
      try {
        await this.prisma.updateById<FileDto>('tbl_file', {
          id: fileInfos[i].id,
          ifMerge: base.Y,
          ifFinished: base.Y,
        });
      } catch (e) {
        console.error(e);
        this.winston.error(e);
      }
    }
    return R.ok(true);
  }
}
