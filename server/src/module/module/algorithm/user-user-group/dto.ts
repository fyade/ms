import { BaseDto } from '../../../../common/dto/BaseDto';
import { PageDto } from '../../../../common/dto/PageDto';
import { IsNotEmpty, MaxLength, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UserUserGroupDto extends BaseDto {
  id: number;

  userId: string;

  userGroupId: number;

  loginRole: string;
}

export class UserUserGroupSelListDto extends PageDto {
  @ApiProperty({ description: '用户id', required: false })
  userId: string;

  @ApiProperty({ description: '用户组id', required: false })
  userGroupId: number;

  @ApiProperty({ description: '登录身份', required: false })
  loginRole: string;
}

export class UserUserGroupSelAllDto {
  @ApiProperty({ description: '用户id', required: false })
  userId: string;

  @ApiProperty({ description: '用户组id', required: false })
  userGroupId: number;

  @ApiProperty({ description: '登录身份', required: false })
  loginRole: string;
}

export class UserUserGroupInsOneDto {
  @ApiProperty({ description: '用户id', required: true })
  @IsNotEmpty({ message: '用户id不能为空' })
  @MaxLength(10, { message: '用户id不能超过10个字符' })
  userId: string;

  @ApiProperty({ description: '用户组id', required: true })
  @Type(() => Number)
  @IsNotEmpty({ message: '用户组id不能为空' })
  userGroupId: number;

  @ApiProperty({ description: '登录身份', required: true })
  @IsNotEmpty({ message: '登录身份不能为空' })
  @MaxLength(30, { message: '登录身份不能超过30个字符' })
  loginRole: string;
}

export class UserUserGroupUpdOneDto extends UserUserGroupInsOneDto {
  @ApiProperty({ description: '主键id', required: true })
  @IsNotEmpty({ message: '主键id不能为空' })
  id: number;
}

export class UserUserGroupInsMoreDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UserUserGroupInsOneDto)
  items: UserUserGroupInsOneDto[];
}

export class UserUserGroupUpdMoreDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UserUserGroupUpdOneDto)
  items: UserUserGroupUpdOneDto[];
}

export class UserUserGroupUpdUUGDtp {
  @ApiProperty({ description: '用户id', required: true })
  @IsNotEmpty({ message: '用户id不能为空' })
  @MaxLength(10, { message: '用户id不能超过10个字符' })
  userId: string;

  @ApiProperty({ description: '用户组id', required: true })
  @IsArray({ message: '用户组id应为数组' })
  userGroupId: number[];

  @ApiProperty({ description: '登录身份', required: true })
  @IsNotEmpty({ message: '登录身份不能为空' })
  @MaxLength(30, { message: '登录身份不能超过30个字符' })
  loginRole: string;
}

export class UserUserGroupUpdUGUDtp {
  @ApiProperty({ description: '用户id', required: true })
  @IsArray({ message: '用户id应为数组' })
  userId: string[];

  @ApiProperty({ description: '用户组id', required: true })
  @Type(() => Number)
  @IsNotEmpty({ message: '用户组id不能为空' })
  userGroupId: number;

  @ApiProperty({ description: '登录身份', required: true })
  @IsNotEmpty({ message: '登录身份不能为空' })
  @MaxLength(30, { message: '登录身份不能超过30个字符' })
  loginRole: string;
}
