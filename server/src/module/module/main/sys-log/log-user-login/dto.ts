import { BaseDto } from '../../../../../common/dto/BaseDto';
import { PageDto } from '../../../../../common/dto/PageDto';
import { IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export const PASSWORD_ERROR = 'password_error';
export const NOT_ADMIN = 'not_admin';

export class LogUserLoginDto extends BaseDto {
  id: number;

  userId: string;

  loginIp: string;

  loginPosition: string;

  loginBrowser: string;

  loginOs: string;

  ifSuccess: string;

  failType: string;

  loginRole: string;

  remark: string;
}

export class LogUserLoginSelListDto extends PageDto {
  @ApiProperty({ description: '用户id', required: false })
  userId: string;

  @ApiProperty({ description: '登录ip', required: false })
  loginIp: string;

  @ApiProperty({ description: '登录地', required: false })
  loginPosition: string;

  @ApiProperty({ description: '登录浏览器', required: false })
  loginBrowser: string;

  @ApiProperty({ description: '登录系统', required: false })
  loginOs: string;

  @ApiProperty({ description: '是否成功', required: false })
  ifSuccess: string;

  @ApiProperty({ description: '失败类型', required: false })
  failType: string;

  @ApiProperty({ description: '登录身份', required: false })
  loginRole: string;

  @ApiProperty({ description: '备注', required: false })
  remark: string;
}

export class LogUserLoginSelAllDto {
  @ApiProperty({ description: '用户id', required: false })
  userId?: string;

  @ApiProperty({ description: '登录ip', required: false })
  loginIp?: string;

  @ApiProperty({ description: '登录地', required: false })
  loginPosition?: string;

  @ApiProperty({ description: '登录浏览器', required: false })
  loginBrowser?: string;

  @ApiProperty({ description: '登录系统', required: false })
  loginOs?: string;

  @ApiProperty({ description: '是否成功', required: false })
  ifSuccess?: string;

  @ApiProperty({ description: '失败类型', required: false })
  failType?: string;

  @ApiProperty({ description: '登录身份', required: false })
  loginRole?: string;

  @ApiProperty({ description: '备注', required: false })
  remark?: string;
}

export class LogUserLoginInsOneDto {
  @ApiProperty({ description: '用户id', required: true })
  @IsNotEmpty({ message: '用户id不能为空' })
  userId: string;

  @ApiProperty({ description: '登录ip', required: true })
  @IsNotEmpty({ message: '登录ip不能为空' })
  loginIp: string;

  @ApiProperty({ description: '登录地', required: true })
  @IsNotEmpty({ message: '登录地不能为空' })
  loginPosition: string;

  @ApiProperty({ description: '登录浏览器', required: true })
  @IsNotEmpty({ message: '登录浏览器不能为空' })
  loginBrowser: string;

  @ApiProperty({ description: '登录系统', required: true })
  @IsNotEmpty({ message: '登录系统不能为空' })
  loginOs: string;

  @ApiProperty({ description: '是否成功', required: true })
  @IsNotEmpty({ message: '是否成功不能为空' })
  ifSuccess: string;

  @ApiProperty({ description: '失败类型', required: true })
  @IsNotEmpty({ message: '失败类型不能为空' })
  failType: string;

  @ApiProperty({ description: '登录身份', required: true })
  @IsNotEmpty({ message: '登录身份不能为空' })
  loginRole: string;

  @ApiProperty({ description: '备注', required: false })
  remark: string;
}

export class LogUserLoginUpdOneDto extends LogUserLoginInsOneDto {
  @ApiProperty({ description: '主键id', required: true })
  @IsNotEmpty({ message: '主键id不能为空' })
  id: number;
}
