import { BaseDto } from '../../../../common/dto/BaseDto';
import { PageDto } from '../../../../common/dto/PageDto';
import { IsNotEmpty, IsOptional, MaxLength, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class InterfaceDto extends BaseDto {
  id: number;

  label: string;

  icon: string;

  orderNum: number;

  ifDisabled: string;

  ifPublic: string;

  perms: string;

  url: string;

  remark: string;
}

export class InterfaceSelListDto extends PageDto {
  @ApiProperty({ description: '接口名', required: false })
  label: string;

  @ApiProperty({ description: '顺序', required: false })
  orderNum: number;

  @ApiProperty({ description: '是否禁用', required: false })
  ifDisabled: string;

  @ApiProperty({ description: '是否公共接口', required: false })
  ifPublic: string;

  @ApiProperty({ description: '权限标识', required: false })
  perms: string;

  @ApiProperty({ description: '请求url', required: false })
  url: string;

  @ApiProperty({ description: '备注', required: false })
  remark: string;
}

export class InterfaceSelAllDto {
  @ApiProperty({ description: '接口名', required: false })
  label?: string;

  @ApiProperty({ description: '顺序', required: false })
  orderNum?: number;

  @ApiProperty({ description: '是否禁用', required: false })
  ifDisabled?: string;

  @ApiProperty({ description: '是否公共接口', required: false })
  ifPublic?: string;

  @ApiProperty({ description: '权限标识', required: false })
  perms?: string;

  @ApiProperty({ description: '请求url', required: false })
  url?: string;

  @ApiProperty({ description: '备注', required: false })
  remark?: string;
}

export class InterfaceInsOneDto {
  @ApiProperty({ description: '接口名', required: true })
  @IsNotEmpty({ message: '接口名不能为空' })
  @MaxLength(30, { message: '接口名不能超过30个字符' })
  label: string;

  @ApiProperty({ description: '图标', required: false })
  @MaxLength(30, { message: '图标不能超过30个字符' })
  icon: string;

  @ApiProperty({ description: '顺序', required: true })
  @Type(() => Number)
  @IsNotEmpty({ message: '顺序不能为空' })
  orderNum: number;

  @ApiProperty({ description: '是否禁用', required: true })
  @IsNotEmpty({ message: '是否禁用不能为空' })
  @MaxLength(1, { message: '是否禁用不能超过1个字符' })
  ifDisabled: string;

  @ApiProperty({ description: '是否公共接口', required: true })
  @IsNotEmpty({ message: '是否公共接口不能为空' })
  @MaxLength(1, { message: '是否公共接口不能超过1个字符' })
  ifPublic: string;

  @ApiProperty({ description: '权限标识', required: true })
  @IsNotEmpty({ message: '权限标识不能为空' })
  @MaxLength(100, { message: '权限标识不能超过100个字符' })
  perms: string;

  @ApiProperty({ description: '请求url', required: true })
  @IsNotEmpty({ message: '请求url不能为空' })
  @MaxLength(100, { message: '请求url不能超过100个字符' })
  url: string;

  @ApiProperty({ description: '备注', required: false })
  @IsOptional()
  @MaxLength(300, { message: '备注不能超过300个字符' })
  remark: string;
}

export class InterfaceUpdOneDto extends InterfaceInsOneDto {
  @ApiProperty({ description: '主键id', required: true })
  @IsNotEmpty({ message: '主键id不能为空' })
  id: number;
}

export class InterfaceInsMoreDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => InterfaceInsOneDto)
  items: InterfaceInsOneDto[];
}

export class InterfaceUpdMoreDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => InterfaceUpdOneDto)
  items: InterfaceUpdOneDto[];
}
