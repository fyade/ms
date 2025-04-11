import { BaseDto } from '../../../../../common/dto/BaseDto';
import { PageDto } from '../../../../../common/dto/PageDto';
import { IsNotEmpty, IsOptional, MaxLength, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CodeGenColumnDto extends BaseDto {
  id: number;

  tableId: number;

  colName: string;

  colDescr: string;

  mysqlType: string;

  mysqlLength: number;

  tsType: string;

  tsName: string;

  ifIns: string;

  ifUpd: string;

  ifSelOne: string;

  ifSelMore: string;

  ifRequired: string;

  selType: string;

  formType: string;

  orderNum: number;

  remark: string;
}

export class CodeGenColumnSelListDto extends PageDto {
  @ApiProperty({ description: '所属表', required: false })
  tableId: number;

  @ApiProperty({ description: '列名', required: false })
  colName: string;

  @ApiProperty({ description: '字段描述', required: false })
  colDescr: string;

  @ApiProperty({ description: 'mysql类型', required: false })
  mysqlType: string;

  @ApiProperty({ description: 'mysql长度', required: false })
  mysqlLength: number;

  @ApiProperty({ description: 'ts类型', required: false })
  tsType: string;

  @ApiProperty({ description: 'ts属性', required: false })
  tsName: string;

  @ApiProperty({ description: '增', required: false })
  ifIns: string;

  @ApiProperty({ description: '改', required: false })
  ifUpd: string;

  @ApiProperty({ description: '查1', required: false })
  ifSelOne: string;

  @ApiProperty({ description: '查n', required: false })
  ifSelMore: string;

  @ApiProperty({ description: '必填', required: false })
  ifRequired: string;

  @ApiProperty({ description: '查询方式', required: false })
  selType: string;

  @ApiProperty({ description: '表单类型', required: false })
  formType: string;

  @ApiProperty({ description: '顺序', required: false })
  orderNum: number;

  @ApiProperty({ description: '备注', required: false })
  remark: string;
}

export class CodeGenColumnSelAllDto {
  @ApiProperty({ description: '所属表', required: false })
  tableId: number;

  @ApiProperty({ description: '列名', required: false })
  colName: string;

  @ApiProperty({ description: '字段描述', required: false })
  colDescr: string;

  @ApiProperty({ description: 'mysql类型', required: false })
  mysqlType: string;

  @ApiProperty({ description: 'mysql长度', required: false })
  mysqlLength: number;

  @ApiProperty({ description: 'ts类型', required: false })
  tsType: string;

  @ApiProperty({ description: 'ts属性', required: false })
  tsName: string;

  @ApiProperty({ description: '增', required: false })
  ifIns: string;

  @ApiProperty({ description: '改', required: false })
  ifUpd: string;

  @ApiProperty({ description: '查1', required: false })
  ifSelOne: string;

  @ApiProperty({ description: '查n', required: false })
  ifSelMore: string;

  @ApiProperty({ description: '必填', required: false })
  ifRequired: string;

  @ApiProperty({ description: '查询方式', required: false })
  selType: string;

  @ApiProperty({ description: '表单类型', required: false })
  formType: string;

  @ApiProperty({ description: '顺序', required: false })
  orderNum: number;

  @ApiProperty({ description: '备注', required: false })
  remark: string;
}

export class CodeGenColumnInsOneDto {
  @ApiProperty({ description: '所属表', required: true })
  @Type(() => Number)
  @IsNotEmpty({ message: '所属表不能为空' })
  tableId: number;

  @ApiProperty({ description: '列名', required: true })
  @IsNotEmpty({ message: '列名不能为空' })
  @MaxLength(60, { message: '列名不能超过60个字符' })
  colName: string;

  @ApiProperty({ description: '字段描述', required: true })
  @IsNotEmpty({ message: '字段描述不能为空' })
  @MaxLength(60, { message: '字段描述不能超过60个字符' })
  colDescr: string;

  @ApiProperty({ description: 'mysql类型', required: true })
  @IsNotEmpty({ message: 'mysql类型不能为空' })
  @MaxLength(60, { message: 'mysql类型不能超过60个字符' })
  mysqlType: string;

  @ApiProperty({ description: 'mysql长度', required: true })
  @Type(() => Number)
  @IsNotEmpty({ message: 'mysql长度不能为空' })
  mysqlLength: number;

  @ApiProperty({ description: 'ts类型', required: true })
  @IsNotEmpty({ message: 'ts类型不能为空' })
  @MaxLength(10, { message: 'ts类型不能超过10个字符' })
  tsType: string;

  @ApiProperty({ description: 'ts属性', required: true })
  @IsNotEmpty({ message: 'ts属性不能为空' })
  @MaxLength(60, { message: 'ts属性不能超过60个字符' })
  tsName: string;

  @ApiProperty({ description: '增', required: true })
  @IsNotEmpty({ message: '增不能为空' })
  @MaxLength(1, { message: '增不能超过1个字符' })
  ifIns: string;

  @ApiProperty({ description: '改', required: true })
  @IsNotEmpty({ message: '改不能为空' })
  @MaxLength(1, { message: '改不能超过1个字符' })
  ifUpd: string;

  @ApiProperty({ description: '查1', required: true })
  @IsNotEmpty({ message: '查1不能为空' })
  @MaxLength(1, { message: '查1不能超过1个字符' })
  ifSelOne: string;

  @ApiProperty({ description: '查n', required: true })
  @IsNotEmpty({ message: '查n不能为空' })
  @MaxLength(1, { message: '查n不能超过1个字符' })
  ifSelMore: string;

  @ApiProperty({ description: '必填', required: true })
  @IsNotEmpty({ message: '必填不能为空' })
  @MaxLength(1, { message: '必填不能超过1个字符' })
  ifRequired: string;

  @ApiProperty({ description: '查询方式', required: true })
  @IsNotEmpty({ message: '查询方式不能为空' })
  @MaxLength(10, { message: '查询方式不能超过10个字符' })
  selType: string;

  @ApiProperty({ description: '表单类型', required: true })
  @IsNotEmpty({ message: '表单类型不能为空' })
  @MaxLength(20, { message: '表单类型不能超过20个字符' })
  formType: string;

  @ApiProperty({ description: '顺序', required: true })
  @Type(() => Number)
  @IsNotEmpty({ message: '顺序不能为空' })
  orderNum: number;

  @ApiProperty({ description: '备注', required: false })
  @IsOptional()
  @MaxLength(300, { message: '备注不能超过300个字符' })
  remark: string;
}

export class CodeGenColumnUpdOneDto extends CodeGenColumnInsOneDto {
  @ApiProperty({ description: '主键id', required: true })
  @IsNotEmpty({ message: '主键id不能为空' })
  id: number;
}

export class CodeGenColumnInsMoreDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CodeGenColumnInsOneDto)
  items: CodeGenColumnInsOneDto[];
}

export class CodeGenColumnUpdMoreDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CodeGenColumnUpdOneDto)
  items: CodeGenColumnUpdOneDto[];
}
