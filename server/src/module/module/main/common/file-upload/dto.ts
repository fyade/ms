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

export class FileInsOneDto {
  @ApiProperty({ description: '原文件名', required: true })
  @IsNotEmpty({ message: '原文件名不能为空' })
  fileName: string;

  @ApiProperty({ description: '新文件名', required: true })
  @IsNotEmpty({ message: '新文件名不能为空' })
  fileNewName: string;

  @ApiProperty({ description: '文件大小', required: true })
  @Type(() => Number)
  @IsNotEmpty({ message: '文件大小不能为空' })
  fileSize: number;

  @ApiProperty({ description: '文件md5', required: true })
  @IsNotEmpty({ message: '文件md5不能为空' })
  fileMd5: string;

  @ApiProperty({ description: '是否分片', required: true })
  @IsNotEmpty({ message: '是否分片不能为空' })
  ifChunk: string;

  @ApiProperty({ description: '分片数量', required: true })
  @Type(() => Number)
  @IsNotEmpty({ message: '分片数量不能为空' })
  chunkNum: number;

  @ApiProperty({ description: '是否合并', required: true })
  @IsNotEmpty({ message: '是否合并不能为空' })
  ifMerge: string;

  @ApiProperty({ description: '是否首次上传', required: true })
  @IsNotEmpty({ message: '是否首次上传不能为空' })
  ifFirst: string;

  @ApiProperty({ description: '是否上传结束', required: true })
  @IsNotEmpty({ message: '是否上传结束不能为空' })
  ifFinished: string;

  @ApiProperty({ description: '业务模块', required: true })
  @IsNotEmpty({ message: '业务模块不能为空' })
  module: string;

  @ApiProperty({ description: '备注', required: false })
  remark: string;
}

export class FileUpdOneDto extends FileInsOneDto {
  @ApiProperty({ description: '主键id', required: true })
  @IsNotEmpty({ message: '主键id不能为空' })
  id: string;
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

export class FileChunkInsOneDto {
  @ApiProperty({ description: '文件md5', required: true })
  @IsNotEmpty({ message: '文件md5不能为空' })
  fileMd5: string;

  @ApiProperty({ description: '新文件名', required: true })
  @IsNotEmpty({ message: '新文件名不能为空' })
  fileNewName: string;

  @ApiProperty({ description: '分片名', required: true })
  @IsNotEmpty({ message: '分片名不能为空' })
  chunkName: string;

  @ApiProperty({ description: '分片下标', required: true })
  @Type(() => Number)
  @IsNotEmpty({ message: '分片下标不能为空' })
  chunkIndex: number;

  @ApiProperty({ description: '是否结束', required: true })
  @IsNotEmpty({ message: '是否结束不能为空' })
  ifFinished: string;

  @ApiProperty({ description: '备注', required: false })
  remark: string;
}

export class FileChunkUpdOneDto extends FileChunkInsOneDto {
  @ApiProperty({ description: '主键id', required: true })
  @IsNotEmpty({ message: '主键id不能为空' })
  id: string;
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
