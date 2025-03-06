import { BaseDto } from '../../../../../common/dto/BaseDto';
import { PageDto } from '../../../../../common/dto/PageDto';
import { IsArray, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UserDeptDto extends BaseDto {
  id: number;

  userId: string;

  deptId: number;

  loginRole: string;
}

export class UserDeptSelListDto extends PageDto {
  @ApiProperty({ description: '用户', required: false })
  userId: string;

  @ApiProperty({ description: '部门', required: false })
  deptId: number;

  @ApiProperty({ description: '登录身份', required: false })
  loginRole: string;
}

export class UserDeptSelAllDto {
  @ApiProperty({ description: '用户', required: false })
  userId: string;

  @ApiProperty({ description: '部门', required: false })
  deptId: number;

  @ApiProperty({ description: '登录身份', required: false })
  loginRole: string;
}

export class UserDeptInsOneDto {
  @ApiProperty({ description: '用户', required: true })
  @IsNotEmpty({ message: '用户不能为空' })
  userId: string;

  @ApiProperty({ description: '部门', required: true })
  @Type(() => Number)
  @IsNotEmpty({ message: '部门不能为空' })
  deptId: number;

  @ApiProperty({ description: '登录身份', required: true })
  @IsNotEmpty({ message: '登录身份不能为空' })
  loginRole: string;
}

export class UserDeptUpdOneDto extends UserDeptInsOneDto {
  @ApiProperty({ description: '主键id', required: true })
  @IsNotEmpty({ message: '主键id不能为空' })
  id: number;
}

export class UserDeptUpdUDDto {
  @ApiProperty({ description: '用户', required: true })
  @IsNotEmpty({ message: '用户不能为空' })
  userId: string;

  @ApiProperty({ description: '部门', required: true })
  @IsArray({ message: '部门应为数组' })
  deptId: number[];

  @ApiProperty({ description: '登录身份', required: true })
  @IsNotEmpty({ message: '登录身份不能为空' })
  loginRole: string;
}

export class UserDeptUpdDUDto {
  @ApiProperty({ description: '用户', required: true })
  @IsArray({ message: '用户应为数组' })
  userId: string[];

  @ApiProperty({ description: '部门', required: true })
  @IsNotEmpty({ message: '部门不能为空' })
  deptId: number;

  @ApiProperty({ description: '登录身份', required: true })
  @IsNotEmpty({ message: '登录身份不能为空' })
  loginRole: string;
}
