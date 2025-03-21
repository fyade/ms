import { Body, Controller, Get, Param, Post, Query, UploadedFile, UseInterceptors, UsePipes } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { R } from '../../../../../common/R';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  FileSelListDto,
  FileUploadOneChunk_check,
  FileUploadOneChunk_merge,
  FileUploadOneChunk_upload,
  FileUploadOneFull_upload,
} from './dto';
import { Authorize } from '../../../../../decorator/authorize.decorator';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ValidationPipe } from '../../../../../pipe/validation/validation.pipe';
import { Exception } from "../../../../../exception/exception";
import { serverConfig } from "@ms/config";

@Controller('/main/sys/file-upload')
@ApiTags('通用/文件上传')
@ApiBearerAuth()
@UsePipes(new ValidationPipe())
export class FileUploadController {
  private env: ReturnType<typeof serverConfig.currentConfig>;

  constructor(private readonly fileUploadService: FileUploadService) {
    this.env = serverConfig.currentConfig();
  }

  @Get()
  @ApiOperation({
    summary: '分页查询文件上传列表',
  })
  @Authorize({
    permission: 'main:system:fileupload:selList',
    label: '分页查询文件上传列表',
  })
  async selList(@Query() dto: FileSelListDto): Promise<R> {
    return this.fileUploadService.selList(dto);
  }

  @Post('/one-full')
  @ApiOperation({
    summary: '文件上传-单文件完整上传',
  })
  @UseInterceptors(FileInterceptor('file'))
  @Authorize({
    permission: 'main:system:fileupload:onefull',
    label: '文件上传-单文件完整上传',
  })
  async fileUploadOneFull0(@Body() param: FileUploadOneFull_upload, @UploadedFile() file): Promise<R> {
    if (file.size > this.env.file.maxSizeOfFull) {
      throw new Exception('文件大小超出限制。');
    }
    delete param.file;
    return this.fileUploadService.fileUploadOneFull(file, param);
  }

  @Post('/one-full-avatar')
  @ApiOperation({
    summary: '文件上传-头像',
  })
  @UseInterceptors(FileInterceptor('file'))
  @Authorize({
    permission: 'main:system:fileupload:avatar',
    label: '文件上传-头像',
  })
  async fileUploadAvatar(@Body() param: FileUploadOneFull_upload, @UploadedFile() file): Promise<R> {
    if (file.size > this.env.file.maxSizeOfFull) {
      throw new Exception('文件大小超出限制。');
    }
    delete param.file;
    return this.fileUploadService.fileUploadOneFull(file, { fileName: param.fileName, module: 'avatar' });
  }

  @Post('/one-chunk/check')
  @ApiOperation({
    summary: '文件上传-单文件分片上传前检查',
  })
  @Authorize({
    permission: 'main:system:fileupload:onechunkcheck',
    label: '文件上传-单文件分片上传前检查',
  })
  async fileUploadOneChunkCheck(@Body() dto: FileUploadOneChunk_check): Promise<R> {
    return this.fileUploadService.fileUploadOneChunkCheck(dto);
  }

  @Post('/one-chunk/upload')
  @ApiOperation({
    summary: '文件上传-单文件分片上传',
  })
  @UseInterceptors(FileInterceptor('file'))
  @Authorize({
    permission: 'main:system:fileupload:onechunkupload',
    label: '文件上传-单文件分片上传',
  })
  async fileUploadOneChunkUpload(@Body() param: FileUploadOneChunk_upload, @UploadedFile() file): Promise<R> {
    delete param.file;
    return this.fileUploadService.fileUploadOneChunkUpload({
      fileMd5: param.fileMd5,
      chunkIndex: param.chunkIndex,
      fileNewName: param.fileNewName,
      file: file,
    });
  }

  @Post('/one-chunk/merge')
  @ApiOperation({
    summary: '文件上传-单文件分片上传分片合并',
  })
  @Authorize({
    permission: 'main:system:fileupload:onechunkmerge',
    label: '文件上传-单文件分片上传分片合并',
  })
  async fileUploadOneChunkMerge(@Body() dto: FileUploadOneChunk_merge): Promise<R> {
    return this.fileUploadService.fileUploadOneChunkMerge(dto);
  }
}
