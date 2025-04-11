import { BaseDto } from '../../../../common/dto/BaseDto';
import { PageDto } from '../../../../common/dto/PageDto';
import { IsNotEmpty, IsOptional, MaxLength, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UserGroupPermissionDto extends BaseDto {
  id: number;

  userGroupId: number;

  permissionId: number;

  ifLongTerm: string;

  ifLimitRequestTimes: string;

  ifRejectRequestUseUp: string;

  permissionStartTime: string;

  permissionEndTime: string;

  limitRequestTimes: number;

  ifUseUp: string;

  orderNum: number;

  remark: string;
}

export class UserGroupPermissionSelListDto extends PageDto {
  @ApiProperty({ description: '用户组id', required: false })
  userGroupId: number;

  @ApiProperty({ description: '接口组id', required: false })
  permissionId: number;

  @ApiProperty({ description: '是否长期权限', required: false })
  ifLongTerm: string;

  @ApiProperty({ description: '是否限制次数', required: false })
  ifLimitRequestTimes: string;

  @ApiProperty({ description: '次数用尽后是否拒绝请求', required: false })
  ifRejectRequestUseUp: string;

  @ApiProperty({ description: '权限开始时间', required: false })
  permissionStartTime: string;

  @ApiProperty({ description: '权限结束时间', required: false })
  permissionEndTime: string;

  @ApiProperty({ description: '请求限制次数', required: false })
  limitRequestTimes: number;

  @ApiProperty({ description: '是否已用尽', required: false })
  ifUseUp: string;

  @ApiProperty({ description: '顺序', required: false })
  orderNum: number;

  @ApiProperty({ description: '备注', required: false })
  remark: string;
}

export class UserGroupPermissionSelAllDto {
  @ApiProperty({ description: '用户组id', required: false })
  userGroupId: number;

  @ApiProperty({ description: '接口组id', required: false })
  permissionId: number;

  @ApiProperty({ description: '是否长期权限', required: false })
  ifLongTerm: string;

  @ApiProperty({ description: '是否限制次数', required: false })
  ifLimitRequestTimes: string;

  @ApiProperty({ description: '次数用尽后是否拒绝请求', required: false })
  ifRejectRequestUseUp: string;

  @ApiProperty({ description: '权限开始时间', required: false })
  permissionStartTime: string;

  @ApiProperty({ description: '权限结束时间', required: false })
  permissionEndTime: string;

  @ApiProperty({ description: '请求限制次数', required: false })
  limitRequestTimes: number;

  @ApiProperty({ description: '是否已用尽', required: false })
  ifUseUp: string;

  @ApiProperty({ description: '顺序', required: false })
  orderNum: number;

  @ApiProperty({ description: '备注', required: false })
  remark: string;
}

export class UserGroupPermissionInsOneDto {
  @ApiProperty({ description: '用户组id', required: true })
  @Type(() => Number)
  @IsNotEmpty({ message: '用户组id不能为空' })
  userGroupId: number;

  @ApiProperty({ description: '接口组id', required: true })
  @Type(() => Number)
  @IsNotEmpty({ message: '接口组id不能为空' })
  permissionId: number;

  @ApiProperty({ description: '是否长期权限', required: true })
  @IsNotEmpty({ message: '是否长期权限不能为空' })
  @MaxLength(1, { message: '是否长期权限不能超过1个字符' })
  ifLongTerm: string;

  @ApiProperty({ description: '是否限制次数', required: true })
  @IsNotEmpty({ message: '是否限制次数不能为空' })
  @MaxLength(1, { message: '是否限制次数不能超过1个字符' })
  ifLimitRequestTimes: string;

  @ApiProperty({ description: '次数用尽后是否拒绝请求', required: true })
  @IsNotEmpty({ message: '次数用尽后是否拒绝请求不能为空' })
  @MaxLength(1, { message: '次数用尽后是否拒绝请求不能超过1个字符' })
  ifRejectRequestUseUp: string;

  @ApiProperty({ description: '权限开始时间', required: true })
  @IsNotEmpty({ message: '权限开始时间不能为空' })
  permissionStartTime: string;

  @ApiProperty({ description: '权限结束时间', required: true })
  @IsNotEmpty({ message: '权限结束时间不能为空' })
  permissionEndTime: string;

  @ApiProperty({ description: '请求限制次数', required: true })
  @Type(() => Number)
  @IsNotEmpty({ message: '请求限制次数不能为空' })
  limitRequestTimes: number;

  @ApiProperty({ description: '是否已用尽', required: false })
  @MaxLength(1, { message: '是否已用尽不能超过1个字符' })
  ifUseUp: string;

  @ApiProperty({ description: '顺序', required: true })
  @Type(() => Number)
  @IsNotEmpty({ message: '顺序不能为空' })
  orderNum: number;

  @ApiProperty({ description: '备注', required: false })
  @IsOptional()
  @MaxLength(300, { message: '备注不能超过300个字符' })
  remark: string;
}

export class UserGroupPermissionUpdOneDto extends UserGroupPermissionInsOneDto {
  @ApiProperty({ description: '主键id', required: true })
  @IsNotEmpty({ message: '主键id不能为空' })
  id: number;
}

export class UserGroupPermissionInsMoreDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UserGroupPermissionInsOneDto)
  items: UserGroupPermissionInsOneDto[];
}

export class UserGroupPermissionUpdMoreDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UserGroupPermissionUpdOneDto)
  items: UserGroupPermissionUpdOneDto[];
}
