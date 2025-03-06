import { BaseDto } from '../../../../common/dto/BaseDto';
import { PageDto } from '../../../../common/dto/PageDto';
import { IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class LogAlgorithmCallDto extends BaseDto {
  id: number;

  userGroupPermissionId: number;

  pperms: string;

  perms: string;

  userId: string;

  callIp: string;

  ifSuccess: string;

  loginRole: string;

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

  @ApiProperty({ description: '请求源ip', required: false })
  callIp: string;

  @ApiProperty({ description: '是否成功', required: false })
  ifSuccess: string;

  @ApiProperty({ description: '登录身份', required: false })
  loginRole: string;

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

  @ApiProperty({ description: '请求源ip', required: false })
  callIp: string;

  @ApiProperty({ description: '是否成功', required: false })
  ifSuccess: string;

  @ApiProperty({ description: '登录身份', required: false })
  loginRole: string;

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
  pperms: string;

  @ApiProperty({ description: '接口权限标识', required: true })
  @IsNotEmpty({ message: '接口权限标识不能为空' })
  perms: string;

  @ApiProperty({ description: '用户id', required: true })
  @IsNotEmpty({ message: '用户id不能为空' })
  userId: string;

  @ApiProperty({ description: '请求源ip', required: true })
  @IsNotEmpty({ message: '请求源ip不能为空' })
  callIp: string;

  @ApiProperty({ description: '是否成功', required: true })
  @IsNotEmpty({ message: '是否成功不能为空' })
  ifSuccess: string;

  @ApiProperty({ description: '登录身份', required: true })
  @IsNotEmpty({ message: '登录身份不能为空' })
  loginRole: string;

  @ApiProperty({ description: '备注', required: false })
  remark: string;
}

export class LogAlgorithmCallUpdOneDto extends LogAlgorithmCallInsOneDto {
  @ApiProperty({ description: '主键id', required: true })
  @IsNotEmpty({ message: '主键id不能为空' })
  id: number;
}
