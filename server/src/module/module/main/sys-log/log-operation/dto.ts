import { BaseDto } from '../../../../../common/dto/BaseDto';
import { PageDto } from '../../../../../common/dto/PageDto';
import { IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class LogOperationDto extends BaseDto {
  id: number;

  reqId: string;

  callIp: string;

  hostName: string;

  perms: string;

  userId: string;

  reqParam: string;

  oldValue: string;

  operateType: string;

  ifSuccess: string;

  loginRole: string;

  remark: string;
}

export class LogOperationSelListDto extends PageDto {
  @ApiProperty({ description: '请求id', required: false })
  reqId: string;

  @ApiProperty({ description: '请求源ip', required: false })
  callIp: string;

  @ApiProperty({ description: '请求源地址', required: false })
  hostName: string;

  @ApiProperty({ description: '权限标识', required: false })
  perms: string;

  @ApiProperty({ description: '用户id', required: false })
  userId: string;

  @ApiProperty({ description: '请求参数', required: false })
  reqParam: string;

  @ApiProperty({ description: '旧值', required: false })
  oldValue: string;

  @ApiProperty({ description: '操作类型', required: false })
  operateType: string;

  @ApiProperty({ description: '是否成功', required: false })
  ifSuccess: string;

  @ApiProperty({ description: '登录身份', required: false })
  loginRole: string;

  @ApiProperty({ description: '备注', required: false })
  remark: string;
}

export class LogOperationSelAllDto {
  @ApiProperty({ description: '请求id', required: false })
  reqId: string;

  @ApiProperty({ description: '请求源ip', required: false })
  callIp: string;

  @ApiProperty({ description: '请求源地址', required: false })
  hostName: string;

  @ApiProperty({ description: '权限标识', required: false })
  perms: string;

  @ApiProperty({ description: '用户id', required: false })
  userId: string;

  @ApiProperty({ description: '请求参数', required: false })
  reqParam: string;

  @ApiProperty({ description: '旧值', required: false })
  oldValue: string;

  @ApiProperty({ description: '操作类型', required: false })
  operateType: string;

  @ApiProperty({ description: '是否成功', required: false })
  ifSuccess: string;

  @ApiProperty({ description: '登录身份', required: false })
  loginRole: string;

  @ApiProperty({ description: '备注', required: false })
  remark: string;
}

export class LogOperationInsOneDto {
  @ApiProperty({ description: '请求id', required: true })
  @IsNotEmpty({ message: '请求id不能为空' })
  reqId: string;

  @ApiProperty({ description: '请求源ip', required: true })
  @IsNotEmpty({ message: '请求源ip不能为空' })
  callIp: string;

  @ApiProperty({ description: '请求源地址', required: true })
  @IsNotEmpty({ message: '请求源地址不能为空' })
  hostName: string;

  @ApiProperty({ description: '权限标识', required: true })
  @IsNotEmpty({ message: '权限标识不能为空' })
  perms: string;

  @ApiProperty({ description: '用户id', required: true })
  @IsNotEmpty({ message: '用户id不能为空' })
  userId: string;

  @ApiProperty({ description: '请求参数', required: true })
  @IsNotEmpty({ message: '请求参数不能为空' })
  reqParam: string;

  @ApiProperty({ description: '旧值', required: true })
  @IsNotEmpty({ message: '旧值不能为空' })
  oldValue: string;

  @ApiProperty({ description: '操作类型', required: true })
  @IsNotEmpty({ message: '操作类型不能为空' })
  operateType: string;

  @ApiProperty({ description: '是否成功', required: true })
  @IsNotEmpty({ message: '是否成功不能为空' })
  ifSuccess: string;

  @ApiProperty({ description: '登录身份', required: true })
  @IsNotEmpty({ message: '登录身份不能为空' })
  loginRole: string;

  @ApiProperty({ description: '备注', required: false })
  remark: string;
}

export class LogOperationUpdOneDto extends LogOperationInsOneDto {
  @ApiProperty({ description: '主键id', required: true })
  @IsNotEmpty({ message: '主键id不能为空' })
  id: number;
}
