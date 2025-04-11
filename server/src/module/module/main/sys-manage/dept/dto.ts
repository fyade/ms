import { BaseDto } from '../../../../../common/dto/BaseDto';
import { PageDto } from '../../../../../common/dto/PageDto';
import { IsNotEmpty, IsOptional, MaxLength, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class DeptDto extends BaseDto {
  id: number;

  label: string;

  ifAdmin: string;

  ifDisabled: string;

  parentId: number;

  orderNum: number;

  remark: string;
}

export class DeptSelListDto extends PageDto {
  @ApiProperty({ description: '部门名', required: false })
  label: string;

  @ApiProperty({ description: '是否管理员权限', required: false })
  ifAdmin: string;

  @ApiProperty({ description: '是否禁用', required: false })
  ifDisabled: string;

  @ApiProperty({ description: '父级部门', required: false })
  parentId: number;

  @ApiProperty({ description: '顺序', required: false })
  orderNum: number;

  @ApiProperty({ description: '备注', required: false })
  remark: string;
}

export class DeptSelAllDto {
  @ApiProperty({ description: '部门名', required: false })
  label: string;

  @ApiProperty({ description: '是否管理员权限', required: false })
  ifAdmin: string;

  @ApiProperty({ description: '是否禁用', required: false })
  ifDisabled: string;

  @ApiProperty({ description: '父级部门', required: false })
  parentId: number;

  @ApiProperty({ description: '顺序', required: false })
  orderNum: number;

  @ApiProperty({ description: '备注', required: false })
  remark: string;
}

export class DeptInsOneDto {
  @ApiProperty({ description: '部门名', required: true })
  @IsNotEmpty({ message: '部门名不能为空' })
  @MaxLength(50, { message: '部门名不能超过50个字符' })
  label: string;

  @ApiProperty({ description: '是否管理员权限', required: true })
  @IsNotEmpty({ message: '是否管理员权限不能为空' })
  @MaxLength(1, { message: '是否管理员权限不能超过1个字符' })
  ifAdmin: string;

  @ApiProperty({ description: '是否禁用', required: true })
  @IsNotEmpty({ message: '是否禁用不能为空' })
  @MaxLength(1, { message: '是否禁用不能超过1个字符' })
  ifDisabled: string;

  @ApiProperty({ description: '父级部门', required: true })
  @Type(() => Number)
  @IsNotEmpty({ message: '父级部门不能为空' })
  parentId: number;

  @ApiProperty({ description: '顺序', required: true })
  @Type(() => Number)
  @IsNotEmpty({ message: '顺序不能为空' })
  orderNum: number;

  @ApiProperty({ description: '备注', required: false })
  @IsOptional()
  @MaxLength(300, { message: '备注不能超过300个字符' })
  remark: string;
}

export class DeptUpdOneDto extends DeptInsOneDto {
  @ApiProperty({ description: '主键id', required: true })
  @IsNotEmpty({ message: '主键id不能为空' })
  id: number;
}

export class DeptInsMoreDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DeptInsOneDto)
  items: DeptInsOneDto[];
}

export class DeptUpdMoreDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DeptUpdOneDto)
  items: DeptUpdOneDto[];
}
