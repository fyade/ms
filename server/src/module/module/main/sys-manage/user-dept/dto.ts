import { BaseDto } from '../../../../../common/dto/BaseDto';
import { PageDto } from '../../../../../common/dto/PageDto';
import { IsNotEmpty, IsOptional, MaxLength, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UserDeptDto extends BaseDto {
  id: number;

  userId: string;

  deptId: number;

  loginRole: string;
}

export class UserDeptSelListDto extends PageDto {
  @ApiProperty({ description: '用户id', required: false })
  userId: string;

  @ApiProperty({ description: '部门id', required: false })
  deptId: number;

  @ApiProperty({ description: '登录身份', required: false })
  loginRole: string;
}

export class UserDeptSelAllDto {
  @ApiProperty({ description: '用户id', required: false })
  userId: string;

  @ApiProperty({ description: '部门id', required: false })
  deptId: number;

  @ApiProperty({ description: '登录身份', required: false })
  loginRole: string;
}

export class UserDeptInsOneDto {
  @ApiProperty({ description: '用户id', required: true })
  @IsNotEmpty({ message: '用户id不能为空' })
  @MaxLength(10, { message: '用户id不能超过10个字符' })
  userId: string;

  @ApiProperty({ description: '部门id', required: true })
  @Type(() => Number)
  @IsNotEmpty({ message: '部门id不能为空' })
  deptId: number;

  @ApiProperty({ description: '登录身份', required: true })
  @IsNotEmpty({ message: '登录身份不能为空' })
  @MaxLength(30, { message: '登录身份不能超过30个字符' })
  loginRole: string;
}

export class UserDeptUpdOneDto extends UserDeptInsOneDto {
  @ApiProperty({ description: '主键id', required: true })
  @IsNotEmpty({ message: '主键id不能为空' })
  id: number;
}

export class UserDeptInsMoreDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UserDeptInsOneDto)
  items: UserDeptInsOneDto[];
}

export class UserDeptUpdMoreDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UserDeptUpdOneDto)
  items: UserDeptUpdOneDto[];
}

export class UserDeptUpdUDDto {
  @ApiProperty({ description: '用户id', required: true })
  @IsNotEmpty({ message: '用户id不能为空' })
  @MaxLength(30, { message: '登录身份不能超过30个字符' })
  userId: string;

  @ApiProperty({ description: '部门id', required: true })
  @IsArray({ message: '部门id应为数组' })
  deptId: number[];

  @ApiProperty({ description: '登录身份', required: true })
  @IsNotEmpty({ message: '登录身份不能为空' })
  @MaxLength(30, { message: '登录身份不能超过30个字符' })
  loginRole: string;
}

export class UserDeptUpdDUDto {
  @ApiProperty({ description: '用户id', required: true })
  @IsArray({ message: '用户id应为数组' })
  userId: string[];

  @ApiProperty({ description: '部门id', required: true })
  @IsNotEmpty({ message: '部门id不能为空' })
  deptId: number;

  @ApiProperty({ description: '登录身份', required: true })
  @IsNotEmpty({ message: '登录身份不能为空' })
  @MaxLength(30, { message: '登录身份不能超过30个字符' })
  loginRole: string;
}
