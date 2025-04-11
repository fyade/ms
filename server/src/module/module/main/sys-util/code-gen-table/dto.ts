import { BaseDto } from '../../../../../common/dto/BaseDto';
import { PageDto } from '../../../../../common/dto/PageDto';
import { IsNotEmpty, IsOptional, MaxLength, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CodeGenTableDto extends BaseDto {
  id: number;

  tableName: string;

  tableDescr: string;

  entityName: string;

  tableRemark: string;

  businessName: string;

  moduleName: string;

  businessNameCn: string;

  moduleNameCn: string;

  sysId: number;

  orderNum: number;

  remark: string;
}

export class CodeGenTableSelListDto extends PageDto {
  @ApiProperty({ description: '表名', required: false })
  tableName: string;

  @ApiProperty({ description: '表描述', required: false })
  tableDescr: string;

  @ApiProperty({ description: '实体类名', required: false })
  entityName: string;

  @ApiProperty({ description: '表备注', required: false })
  tableRemark: string;

  @ApiProperty({ description: '业务名', required: false })
  businessName: string;

  @ApiProperty({ description: '模块名', required: false })
  moduleName: string;

  @ApiProperty({ description: '业务名中文', required: false })
  businessNameCn: string;

  @ApiProperty({ description: '模块名中文', required: false })
  moduleNameCn: string;

  @ApiProperty({ description: '所属系统', required: false })
  sysId: number;

  @ApiProperty({ description: '顺序', required: false })
  orderNum: number;

  @ApiProperty({ description: '备注', required: false })
  remark: string;
}

export class CodeGenTableSelAllDto {
  @ApiProperty({ description: '表名', required: false })
  tableName: string;

  @ApiProperty({ description: '表描述', required: false })
  tableDescr: string;

  @ApiProperty({ description: '实体类名', required: false })
  entityName: string;

  @ApiProperty({ description: '表备注', required: false })
  tableRemark: string;

  @ApiProperty({ description: '业务名', required: false })
  businessName: string;

  @ApiProperty({ description: '模块名', required: false })
  moduleName: string;

  @ApiProperty({ description: '业务名中文', required: false })
  businessNameCn: string;

  @ApiProperty({ description: '模块名中文', required: false })
  moduleNameCn: string;

  @ApiProperty({ description: '所属系统', required: false })
  sysId: number;

  @ApiProperty({ description: '顺序', required: false })
  orderNum: number;

  @ApiProperty({ description: '备注', required: false })
  remark: string;
}

export class CodeGenTableInsOneDto {
  @ApiProperty({ description: '表名', required: true })
  @IsNotEmpty({ message: '表名不能为空' })
  @MaxLength(60, { message: '表名不能超过60个字符' })
  tableName: string;

  @ApiProperty({ description: '表描述', required: true })
  @IsNotEmpty({ message: '表描述不能为空' })
  @MaxLength(100, { message: '表描述不能超过100个字符' })
  tableDescr: string;

  @ApiProperty({ description: '实体类名', required: true })
  @IsNotEmpty({ message: '实体类名不能为空' })
  @MaxLength(60, { message: '实体类名不能超过60个字符' })
  entityName: string;

  @ApiProperty({ description: '表备注', required: false })
  @MaxLength(300, { message: '表备注不能超过300个字符' })
  tableRemark: string;

  @ApiProperty({ description: '业务名', required: false })
  @MaxLength(60, { message: '业务名不能超过60个字符' })
  businessName: string;

  @ApiProperty({ description: '模块名', required: true })
  @IsNotEmpty({ message: '模块名不能为空' })
  @MaxLength(60, { message: '模块名不能超过60个字符' })
  moduleName: string;

  @ApiProperty({ description: '业务名中文', required: false })
  @MaxLength(60, { message: '业务名中文不能超过60个字符' })
  businessNameCn: string;

  @ApiProperty({ description: '模块名中文', required: true })
  @IsNotEmpty({ message: '模块名中文不能为空' })
  @MaxLength(60, { message: '模块名中文不能超过60个字符' })
  moduleNameCn: string;

  @ApiProperty({ description: '所属系统', required: true })
  @Type(() => Number)
  @IsNotEmpty({ message: '所属系统不能为空' })
  sysId: number;

  @ApiProperty({ description: '顺序', required: true })
  @Type(() => Number)
  @IsNotEmpty({ message: '顺序不能为空' })
  orderNum: number;

  @ApiProperty({ description: '备注', required: false })
  @IsOptional()
  @MaxLength(300, { message: '备注不能超过300个字符' })
  remark: string;
}

export class CodeGenTableUpdOneDto extends CodeGenTableInsOneDto {
  @ApiProperty({ description: '主键id', required: true })
  @IsNotEmpty({ message: '主键id不能为空' })
  id: number;
}

export class CodeGenTableInsMoreDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CodeGenTableInsOneDto)
  items: CodeGenTableInsOneDto[];
}

export class CodeGenTableUpdMoreDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CodeGenTableUpdOneDto)
  items: CodeGenTableUpdOneDto[];
}
