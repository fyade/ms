import { BaseDto } from '../../../../../common/dto/BaseDto';
import { PageDto } from '../../../../../common/dto/PageDto';
import { IsNotEmpty, IsOptional, MaxLength, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class DeptSysDto extends BaseDto {
  id: number;

  deptId: number;

  sysId: number;
}

export class DeptSysSelListDto extends PageDto {
  @ApiProperty({ description: '部门id', required: false })
  deptId: number;

  @ApiProperty({ description: '系统id', required: false })
  sysId: number;
}

export class DeptSysSelAllDto {
  @ApiProperty({ description: '部门id', required: false })
  deptId: number;

  @ApiProperty({ description: '系统id', required: false })
  sysId: number;
}

export class DeptSysInsOneDto {
  @ApiProperty({ description: '部门id', required: true })
  @Type(() => Number)
  @IsNotEmpty({ message: '部门id不能为空' })
  deptId: number;

  @ApiProperty({ description: '系统id', required: true })
  @Type(() => Number)
  @IsNotEmpty({ message: '系统id不能为空' })
  sysId: number;
}

export class DeptSysUpdOneDto extends DeptSysInsOneDto {
  @ApiProperty({ description: '主键id', required: true })
  @IsNotEmpty({ message: '主键id不能为空' })
  id: number;
}

export class DeptSysInsMoreDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DeptSysInsOneDto)
  items: DeptSysInsOneDto[];
}

export class DeptSysUpdMoreDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DeptSysUpdOneDto)
  items: DeptSysUpdOneDto[];
}
