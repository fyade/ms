import { BaseDto } from '../../../../../common/dto/BaseDto';
import { PageDto } from '../../../../../common/dto/PageDto';
import { IsNotEmpty, IsOptional, MaxLength, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class RoleDto extends BaseDto {
  id: number;

  label: string;

  ifAdmin: string;

  ifDisabled: string;

  orderNum: number;

  remark: string;
}

export class RoleSelListDto extends PageDto {
  @ApiProperty({ description: '角色名', required: false })
  label: string;

  @ApiProperty({ description: '是否管理员权限', required: false })
  ifAdmin: string;

  @ApiProperty({ description: '是否禁用', required: false })
  ifDisabled: string;

  @ApiProperty({ description: '顺序', required: false })
  orderNum: number;

  @ApiProperty({ description: '备注', required: false })
  remark: string;
}

export class RoleSelAllDto {
  @ApiProperty({ description: '角色名', required: false })
  label: string;

  @ApiProperty({ description: '是否管理员权限', required: false })
  ifAdmin: string;

  @ApiProperty({ description: '是否禁用', required: false })
  ifDisabled: string;

  @ApiProperty({ description: '顺序', required: false })
  orderNum: number;

  @ApiProperty({ description: '备注', required: false })
  remark: string;
}

export class RoleInsOneDto {
  @ApiProperty({ description: '角色名', required: true })
  @IsNotEmpty({ message: '角色名不能为空' })
  @MaxLength(30, { message: '角色名不能超过30个字符' })
  label: string;

  @ApiProperty({ description: '是否管理员权限', required: true })
  @IsNotEmpty({ message: '是否管理员权限不能为空' })
  @MaxLength(1, { message: '是否管理员权限不能超过1个字符' })
  ifAdmin: string;

  @ApiProperty({ description: '是否禁用', required: true })
  @IsNotEmpty({ message: '是否禁用不能为空' })
  @MaxLength(1, { message: '是否禁用不能超过1个字符' })
  ifDisabled: string;

  @ApiProperty({ description: '顺序', required: true })
  @Type(() => Number)
  @IsNotEmpty({ message: '顺序不能为空' })
  orderNum: number;

  @ApiProperty({ description: '备注', required: false })
  @IsOptional()
  @MaxLength(300, { message: '备注不能超过300个字符' })
  remark: string;
}

export class RoleUpdOneDto extends RoleInsOneDto {
  @ApiProperty({ description: '主键id', required: true })
  @IsNotEmpty({ message: '主键id不能为空' })
  id: number;
}

export class RoleInsMoreDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RoleInsOneDto)
  items: RoleInsOneDto[];
}

export class RoleUpdMoreDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RoleUpdOneDto)
  items: RoleUpdOneDto[];
}
