import { BaseDto } from '../../../../../common/dto/BaseDto';
import { PageDto } from '../../../../../common/dto/PageDto';
import { IsNotEmpty, IsOptional, MaxLength, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class SysDto extends BaseDto {
  id: number;

  name: string;

  perms: string;

  orderNum: number;

  path: string;

  ifDisabled: string;

  remark: string;
}

export class SysSelListDto extends PageDto {
  @ApiProperty({ description: '系统名', required: false })
  name: string;

  @ApiProperty({ description: '权限标识', required: false })
  perms: string;

  @ApiProperty({ description: '顺序', required: false })
  orderNum: number;

  @ApiProperty({ description: 'url路径', required: false })
  path: string;

  @ApiProperty({ description: '是否禁用', required: false })
  ifDisabled: string;

  @ApiProperty({ description: '备注', required: false })
  remark: string;
}

export class SysSelAllDto {
  @ApiProperty({ description: '系统名', required: false })
  name: string;

  @ApiProperty({ description: '权限标识', required: false })
  perms: string;

  @ApiProperty({ description: '顺序', required: false })
  orderNum: number;

  @ApiProperty({ description: 'url路径', required: false })
  path: string;

  @ApiProperty({ description: '是否禁用', required: false })
  ifDisabled: string;

  @ApiProperty({ description: '备注', required: false })
  remark: string;
}

export class SysInsOneDto {
  @ApiProperty({ description: '系统名', required: true })
  @IsNotEmpty({ message: '系统名不能为空' })
  @MaxLength(300, { message: '系统名不能超过300个字符' })
  name: string;

  @ApiProperty({ description: '权限标识', required: true })
  @IsNotEmpty({ message: '权限标识不能为空' })
  @MaxLength(100, { message: '权限标识不能超过100个字符' })
  perms: string;

  @ApiProperty({ description: '顺序', required: true })
  @Type(() => Number)
  @IsNotEmpty({ message: '顺序不能为空' })
  orderNum: number;

  @ApiProperty({ description: 'url路径', required: true })
  @IsNotEmpty({ message: 'url路径不能为空' })
  @MaxLength(100, { message: 'url路径不能超过100个字符' })
  path: string;

  @ApiProperty({ description: '是否禁用', required: true })
  @IsNotEmpty({ message: '是否禁用不能为空' })
  @MaxLength(1, { message: '是否禁用不能超过1个字符' })
  ifDisabled: string;

  @ApiProperty({ description: '备注', required: false })
  @IsOptional()
  @MaxLength(300, { message: '备注不能超过300个字符' })
  remark: string;
}

export class SysUpdOneDto extends SysInsOneDto {
  @ApiProperty({ description: '主键id', required: true })
  @IsNotEmpty({ message: '主键id不能为空' })
  id: number;
}

export class SysInsMoreDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SysInsOneDto)
  items: SysInsOneDto[];
}

export class SysUpdMoreDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SysUpdOneDto)
  items: SysUpdOneDto[];
}
