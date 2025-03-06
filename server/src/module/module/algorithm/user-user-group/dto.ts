import { BaseDto } from '../../../../common/dto/BaseDto';
import { PageDto } from '../../../../common/dto/PageDto';
import { IsArray, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UserUserGroupDto extends BaseDto {
  id: number;

  userId: string;

  userGroupId: number;

  loginRole: string;
}

export class UserUserGroupSelListDto extends PageDto {
  @ApiProperty({ description: '用户', required: false })
  userId: string;

  @ApiProperty({ description: '用户组', required: false })
  userGroupId: number;

  @ApiProperty({ description: '登录身份', required: false })
  loginRole: string;
}

export class UserUserGroupSelAllDto {
  @ApiProperty({ description: '用户', required: false })
  userId: string;

  @ApiProperty({ description: '用户组', required: false })
  userGroupId: number;

  @ApiProperty({ description: '登录身份', required: false })
  loginRole: string;
}

export class UserUserGroupInsOneDto {
  @ApiProperty({ description: '用户', required: true })
  @IsNotEmpty({ message: '用户不能为空' })
  userId: string;

  @ApiProperty({ description: '用户组', required: true })
  @Type(() => Number)
  @IsNotEmpty({ message: '用户组不能为空' })
  userGroupId: number;

  @ApiProperty({ description: '登录身份', required: true })
  @IsNotEmpty({ message: '登录身份不能为空' })
  loginRole: string;
}

export class UserUserGroupUpdOneDto extends UserUserGroupInsOneDto {
  @ApiProperty({ description: '主键id', required: true })
  @IsNotEmpty({ message: '主键id不能为空' })
  id: number;
}

export class UserUserGroupUpdUUGDtp {
  @ApiProperty({ description: '用户', required: true })
  @IsNotEmpty({ message: '用户不能为空' })
  userId: string;

  @ApiProperty({ description: '用户组', required: true })
  @Type(() => Number)
  @IsArray({ message: '用户组应为数组' })
  userGroupId: number[];

  @ApiProperty({ description: '登录身份', required: true })
  @IsNotEmpty({ message: '登录身份不能为空' })
  loginRole: string;
}

export class UserUserGroupUpdUGUDtp {
  @ApiProperty({ description: '用户', required: true })
  @IsArray({ message: '用户应为数组' })
  userId: string[];

  @ApiProperty({ description: '用户组', required: true })
  @Type(() => Number)
  @IsNotEmpty({ message: '用户组不能为空' })
  userGroupId: number;

  @ApiProperty({ description: '登录身份', required: true })
  @IsNotEmpty({ message: '登录身份不能为空' })
  loginRole: string;
}
