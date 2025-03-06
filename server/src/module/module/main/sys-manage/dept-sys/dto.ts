import { BaseDto } from '../../../../../common/dto/BaseDto';
import { PageDto } from '../../../../../common/dto/PageDto';
import { IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class DeptSysDto extends BaseDto {
  id: number;

  deptId: number;

  sysId: number;
}

export class DeptSysSelListDto extends PageDto {
  @ApiProperty({ description: '部门', required: false })
  deptId: number;

  @ApiProperty({ description: '系统', required: false })
  sysId: number;
}

export class DeptSysSelAllDto {
  @ApiProperty({ description: '部门', required: false })
  deptId: number;

  @ApiProperty({ description: '系统', required: false })
  sysId: number;
}

export class DeptSysInsOneDto {
  @ApiProperty({ description: '部门', required: true })
  @Type(() => Number)
  @IsNotEmpty({ message: '部门不能为空' })
  deptId: number;

  @ApiProperty({ description: '系统', required: true })
  @Type(() => Number)
  @IsNotEmpty({ message: '系统不能为空' })
  sysId: number;
}

export class DeptSysUpdOneDto extends DeptSysInsOneDto {
  @ApiProperty({ description: '主键id', required: true })
  @IsNotEmpty({ message: '主键id不能为空' })
  id: number;
}
