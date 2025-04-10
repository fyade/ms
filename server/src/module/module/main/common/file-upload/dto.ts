import { BaseDto } from '../../../../../common/dto/BaseDto';
import { PageDto } from '../../../../../common/dto/PageDto';
import { IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class FileDto extends BaseDto {
  id: string;

  fileName: string;

  fileNewName: string;

  fileSize: number;

  fileMd5: string;

  ifChunk: string;

  chunkNum: number;

  ifMerge: string;

  ifFirst: string;

  ifFinished: string;

  module: string;

  remark: string;
}

export class FileSelListDto extends PageDto {
  @ApiProperty({ description: '原文件名', required: false })
  fileName: string;

  @ApiProperty({ description: '新文件名', required: false })
  fileNewName: string;

  @ApiProperty({ description: '文件大小', required: false })
  fileSize: number;

  @ApiProperty({ description: '文件md5', required: false })
  fileMd5: string;

  @ApiProperty({ description: '是否分片', required: false })
  ifChunk: string;

  @ApiProperty({ description: '分片数量', required: false })
  chunkNum: number;

  @ApiProperty({ description: '是否合并', required: false })
  ifMerge: string;

  @ApiProperty({ description: '是否首次上传', required: false })
  ifFirst: string;

  @ApiProperty({ description: '是否上传结束', required: false })
  ifFinished: string;

  @ApiProperty({ description: '业务模块', required: false })
  module: string;

  @ApiProperty({ description: '备注', required: false })
  remark: string;
}

export class FileSelAllDto {
  @ApiProperty({ description: '原文件名', required: false })
  fileName: string;

  @ApiProperty({ description: '新文件名', required: false })
  fileNewName: string;

  @ApiProperty({ description: '文件大小', required: false })
  fileSize: number;

  @ApiProperty({ description: '文件md5', required: false })
  fileMd5: string;

  @ApiProperty({ description: '是否分片', required: false })
  ifChunk: string;

  @ApiProperty({ description: '分片数量', required: false })
  chunkNum: number;

  @ApiProperty({ description: '是否合并', required: false })
  ifMerge: string;

  @ApiProperty({ description: '是否首次上传', required: false })
  ifFirst: string;

  @ApiProperty({ description: '是否上传结束', required: false })
  ifFinished: string;

  @ApiProperty({ description: '业务模块', required: false })
  module: string;

  @ApiProperty({ description: '备注', required: false })
  remark: string;
}

export class FileChunkDto extends BaseDto {
  id: string;

  fileMd5: string;

  fileNewName: string;

  chunkName: string;

  chunkIndex: number;

  ifFinished: string;

  remark: string;
}

export class FileChunkSelListDto extends PageDto {
  @ApiProperty({ description: '文件md5', required: false })
  fileMd5: string;

  @ApiProperty({ description: '新文件名', required: false })
  fileNewName: string;

  @ApiProperty({ description: '分片名', required: false })
  chunkName: string;

  @ApiProperty({ description: '分片下标', required: false })
  chunkIndex: number;

  @ApiProperty({ description: '是否结束', required: false })
  ifFinished: string;

  @ApiProperty({ description: '备注', required: false })
  remark: string;
}

export class FileChunkSelAllDto {
  @ApiProperty({ description: '文件md5', required: false })
  fileMd5: string;

  @ApiProperty({ description: '新文件名', required: false })
  fileNewName: string;

  @ApiProperty({ description: '分片名', required: false })
  chunkName: string;

  @ApiProperty({ description: '分片下标', required: false })
  chunkIndex: number;

  @ApiProperty({ description: '是否结束', required: false })
  ifFinished: string;

  @ApiProperty({ description: '备注', required: false })
  remark: string;
}

export class FileUploadSelListDto2 extends PageDto {
  @ApiProperty({ description: '过滤相同文件', required: false })
  filterSame: string;
}

export class FileUploadOneFull_upload {
  @ApiProperty({ description: '文件名', required: false })
  fileName: string;

  @ApiProperty({ description: '文件', required: false })
  file: any;
}

export class FileUploadOneChunk_check {
  @ApiProperty({ description: '文件名', required: false })
  fileName: string;

  @ApiProperty({ description: '文件md5', required: false })
  fileMd5: string;

  @ApiProperty({ description: '文件大小', required: false })
  fileSize: number;

  @ApiProperty({ description: '分片数量', required: false })
  chunkNum: number;
}

export class FileUploadOneChunk_upload {
  @ApiProperty({ description: '文件md5', required: false })
  fileMd5: string;

  @ApiProperty({ description: '新文件名', required: false })
  fileNewName: string;

  @ApiProperty({ description: '分片下标', required: false })
  chunkIndex: number;

  @ApiProperty({ description: '文件', required: false })
  file: any;
}

export class FileUploadOneChunk_merge {
  @ApiProperty({ description: '新文件名', required: false })
  fileNewName: string;

  @ApiProperty({ description: '文件md5', required: false })
  fileMd5: string;
}
