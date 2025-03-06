import { BaseDto } from '../../../../../common/dto/BaseDto';
import { PageDto } from '../../../../../common/dto/PageDto';
import { IsArray, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UserRoleDto extends BaseDto {
  id: number;

  userId: string;

  roleId: number;

  loginRole: string;
}

export class UserRoleSelListDto extends PageDto {
  @ApiProperty({ description: '用户', required: false })
  userId: string;

  @ApiProperty({ description: '角色', required: false })
  roleId: number;

  @ApiProperty({ description: '登录身份', required: false })
  loginRole: string;
}

export class UserRoleSelAllDto {
  @ApiProperty({ description: '用户', required: false })
  userId: string;

  @ApiProperty({ description: '角色', required: false })
  roleId: number;

  @ApiProperty({ description: '登录身份', required: false })
  loginRole: string;
}

export class UserRoleInsOneDto {
  @ApiProperty({ description: '用户', required: true })
  @IsNotEmpty({ message: '用户不能为空' })
  userId: string;

  @ApiProperty({ description: '角色', required: true })
  @Type(() => Number)
  @IsNotEmpty({ message: '角色不能为空' })
  roleId: number;

  @ApiProperty({ description: '登录身份', required: true })
  @IsNotEmpty({ message: '登录身份不能为空' })
  loginRole: string;
}

export class UserRoleUpdOneDto extends UserRoleInsOneDto {
  @ApiProperty({ description: '主键id', required: true })
  @IsNotEmpty({ message: '主键id不能为空' })
  id: number;
}

export class UserRoleUpdManyURDto {
  @ApiProperty({ description: '用户', required: true })
  @IsNotEmpty({ message: '用户不能为空' })
  userId: string;

  @ApiProperty({ description: '角色', required: true })
  @IsArray({ message: '角色应为数组' })
  roleId: number[];

  @ApiProperty({ description: '登录身份', required: true })
  @IsNotEmpty({ message: '登录身份不能为空' })
  loginRole: string;
}

export class UserRoleUpdManyRUDto {
  @ApiProperty({ description: '用户', required: true })
  @IsArray({ message: '用户应为数组' })
  userId: string[];

  @ApiProperty({ description: '角色', required: true })
  @IsNotEmpty({ message: '角色不能为空' })
  roleId: number;

  @ApiProperty({ description: '登录身份', required: true })
  @IsNotEmpty({ message: '登录身份不能为空' })
  loginRole: string;
}
