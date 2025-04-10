import { BaseDto } from '../../../../../common/dto/BaseDto';
import { PageDto } from '../../../../../common/dto/PageDto';
import { IsNotEmpty, MaxLength, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UserRoleDto extends BaseDto {
  id: number;

  userId: string;

  roleId: number;

  loginRole: string;
}

export class UserRoleSelListDto extends PageDto {
  @ApiProperty({ description: '用户id', required: false })
  userId: string;

  @ApiProperty({ description: '角色id', required: false })
  roleId: number;

  @ApiProperty({ description: '登录身份', required: false })
  loginRole: string;
}

export class UserRoleSelAllDto {
  @ApiProperty({ description: '用户id', required: false })
  userId: string;

  @ApiProperty({ description: '角色id', required: false })
  roleId: number;

  @ApiProperty({ description: '登录身份', required: false })
  loginRole: string;
}

export class UserRoleInsOneDto {
  @ApiProperty({ description: '用户id', required: true })
  @IsNotEmpty({ message: '用户id不能为空' })
  @MaxLength(10, { message: '用户id不能超过10个字符' })
  userId: string;

  @ApiProperty({ description: '角色id', required: true })
  @Type(() => Number)
  @IsNotEmpty({ message: '角色id不能为空' })
  roleId: number;

  @ApiProperty({ description: '登录身份', required: true })
  @IsNotEmpty({ message: '登录身份不能为空' })
  @MaxLength(30, { message: '登录身份不能超过30个字符' })
  loginRole: string;
}

export class UserRoleUpdOneDto extends UserRoleInsOneDto {
  @ApiProperty({ description: '主键id', required: true })
  @IsNotEmpty({ message: '主键id不能为空' })
  id: number;
}

export class UserRoleInsMoreDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UserRoleInsOneDto)
  items: UserRoleInsOneDto[];
}

export class UserRoleUpdMoreDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UserRoleUpdOneDto)
  items: UserRoleUpdOneDto[];
}

export class UserRoleUpdManyURDto {
  @ApiProperty({ description: '用户id', required: true })
  @IsNotEmpty({ message: '用户id不能为空' })
  @MaxLength(10, { message: '用户id不能超过10个字符' })
  userId: string;

  @ApiProperty({ description: '角色id', required: true })
  @IsArray({ message: '角色id应为数组' })
  roleId: number[];

  @ApiProperty({ description: '登录身份', required: true })
  @IsNotEmpty({ message: '登录身份不能为空' })
  @MaxLength(30, { message: '登录身份不能超过30个字符' })
  loginRole: string;
}

export class UserRoleUpdManyRUDto {
  @ApiProperty({ description: '用户id', required: true })
  @IsArray({ message: '用户id应为数组' })
  userId: string[];

  @ApiProperty({ description: '角色id', required: true })
  @IsNotEmpty({ message: '角色id不能为空' })
  roleId: number;

  @ApiProperty({ description: '登录身份', required: true })
  @IsNotEmpty({ message: '登录身份不能为空' })
  @MaxLength(30, { message: '登录身份不能超过30个字符' })
  loginRole: string;
}
