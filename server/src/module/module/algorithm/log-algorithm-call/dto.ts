import { BaseDto } from '../../../../common/dto/BaseDto';
import { PageDto } from '../../../../common/dto/PageDto';
import { IsNotEmpty, MaxLength, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class LogAlgorithmCallDto extends BaseDto {
  id: number;

  userGroupPermissionId: number;

  pperms: string;

  perms: string;

  userId: string;

  loginRole: string;

  callIp: string;

  ifSuccess: string;

  remark: string;
}

export class LogAlgorithmCallSelListDto extends PageDto {
  @ApiProperty({ description: '用户组权限id', required: false })
  userGroupPermissionId: number;

  @ApiProperty({ description: '接口组权限标识', required: false })
  pperms: string;

  @ApiProperty({ description: '接口权限标识', required: false })
  perms: string;

  @ApiProperty({ description: '用户id', required: false })
  userId: string;

  @ApiProperty({ description: '登录身份', required: false })
  loginRole: string;

  @ApiProperty({ description: '请求源ip', required: false })
  callIp: string;

  @ApiProperty({ description: '是否成功', required: false })
  ifSuccess: string;

  @ApiProperty({ description: '备注', required: false })
  remark: string;
}

export class LogAlgorithmCallSelAllDto {
  @ApiProperty({ description: '用户组权限id', required: false })
  userGroupPermissionId: number;

  @ApiProperty({ description: '接口组权限标识', required: false })
  pperms: string;

  @ApiProperty({ description: '接口权限标识', required: false })
  perms: string;

  @ApiProperty({ description: '用户id', required: false })
  userId: string;

  @ApiProperty({ description: '登录身份', required: false })
  loginRole: string;

  @ApiProperty({ description: '请求源ip', required: false })
  callIp: string;

  @ApiProperty({ description: '是否成功', required: false })
  ifSuccess: string;

  @ApiProperty({ description: '备注', required: false })
  remark: string;
}

export class LogAlgorithmCallInsOneDto {
  @ApiProperty({ description: '用户组权限id', required: true })
  @Type(() => Number)
  @IsNotEmpty({ message: '用户组权限id不能为空' })
  userGroupPermissionId: number;

  @ApiProperty({ description: '接口组权限标识', required: true })
  @IsNotEmpty({ message: '接口组权限标识不能为空' })
  @MaxLength(100, { message: '接口组权限标识不能超过100个字符' })
  pperms: string;

  @ApiProperty({ description: '接口权限标识', required: true })
  @IsNotEmpty({ message: '接口权限标识不能为空' })
  @MaxLength(100, { message: '接口权限标识不能超过100个字符' })
  perms: string;

  @ApiProperty({ description: '用户id', required: true })
  @IsNotEmpty({ message: '用户id不能为空' })
  @MaxLength(10, { message: '用户id不能超过10个字符' })
  userId: string;

  @ApiProperty({ description: '登录身份', required: true })
  @IsNotEmpty({ message: '登录身份不能为空' })
  @MaxLength(30, { message: '登录身份不能超过30个字符' })
  loginRole: string;

  @ApiProperty({ description: '请求源ip', required: true })
  @IsNotEmpty({ message: '请求源ip不能为空' })
  @MaxLength(20, { message: '请求源ip不能超过20个字符' })
  callIp: string;

  @ApiProperty({ description: '是否成功', required: true })
  @IsNotEmpty({ message: '是否成功不能为空' })
  @MaxLength(1, { message: '是否成功不能超过1个字符' })
  ifSuccess: string;

  @ApiProperty({ description: '备注', required: false })
  @MaxLength(100, { message: '备注不能超过100个字符' })
  remark: string;
}

export class LogAlgorithmCallUpdOneDto extends LogAlgorithmCallInsOneDto {
  @ApiProperty({ description: '主键id', required: true })
  @IsNotEmpty({ message: '主键id不能为空' })
  id: number;
}

export class LogAlgorithmCallInsMoreDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LogAlgorithmCallInsOneDto)
  items: LogAlgorithmCallInsOneDto[];
}

export class LogAlgorithmCallUpdMoreDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LogAlgorithmCallUpdOneDto)
  items: LogAlgorithmCallUpdOneDto[];
}
