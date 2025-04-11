import { BaseDto } from '../../../../common/dto/BaseDto';
import { PageDto } from '../../../../common/dto/PageDto';
import { IsNotEmpty, IsOptional, MaxLength, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class InterfaceGroupDto extends BaseDto {
  id: number;

  label: string;

  parentId: number;

  perms: string;

  baseURL: string;

  orderNum: number;

  remark: string;
}

export class InterfaceGroupSelListDto extends PageDto {
  @ApiProperty({ description: '接口组名', required: false })
  label: string;

  @ApiProperty({ description: '父级接口组', required: false })
  parentId: number;

  @ApiProperty({ description: '权限标识', required: false })
  perms: string;

  @ApiProperty({ description: 'baseURL', required: false })
  baseURL: string;

  @ApiProperty({ description: '顺序', required: false })
  orderNum: number;

  @ApiProperty({ description: '备注', required: false })
  remark: string;
}

export class InterfaceGroupSelAllDto {
  @ApiProperty({ description: '接口组名', required: false })
  label: string;

  @ApiProperty({ description: '父级接口组', required: false })
  parentId: number;

  @ApiProperty({ description: '权限标识', required: false })
  perms: string;

  @ApiProperty({ description: 'baseURL', required: false })
  baseURL: string;

  @ApiProperty({ description: '顺序', required: false })
  orderNum: number;

  @ApiProperty({ description: '备注', required: false })
  remark: string;
}

export class InterfaceGroupInsOneDto {
  @ApiProperty({ description: '接口组名', required: true })
  @IsNotEmpty({ message: '接口组名不能为空' })
  @MaxLength(30, { message: '接口组名不能超过30个字符' })
  label: string;

  @ApiProperty({ description: '父级接口组', required: true })
  @Type(() => Number)
  @IsNotEmpty({ message: '父级接口组不能为空' })
  parentId: number;

  @ApiProperty({ description: '权限标识', required: true })
  @IsNotEmpty({ message: '权限标识不能为空' })
  @MaxLength(100, { message: '权限标识不能超过100个字符' })
  perms: string;

  @ApiProperty({ description: 'baseURL', required: true })
  @IsNotEmpty({ message: 'baseURL不能为空' })
  @MaxLength(300, { message: 'baseURL不能超过300个字符' })
  baseURL: string;

  @ApiProperty({ description: '顺序', required: true })
  @Type(() => Number)
  @IsNotEmpty({ message: '顺序不能为空' })
  orderNum: number;

  @ApiProperty({ description: '备注', required: false })
  @IsOptional()
  @MaxLength(300, { message: '备注不能超过300个字符' })
  remark: string;
}

export class InterfaceGroupUpdOneDto extends InterfaceGroupInsOneDto {
  @ApiProperty({ description: '主键id', required: true })
  @IsNotEmpty({ message: '主键id不能为空' })
  id: number;
}

export class InterfaceGroupInsMoreDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => InterfaceGroupInsOneDto)
  items: InterfaceGroupInsOneDto[];
}

export class InterfaceGroupUpdMoreDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => InterfaceGroupUpdOneDto)
  items: InterfaceGroupUpdOneDto[];
}
