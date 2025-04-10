import { BaseDto } from '../../../../../common/dto/BaseDto';
import { PageDto } from '../../../../../common/dto/PageDto';
import { IsNotEmpty, MaxLength, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class LogScheduledTaskDto extends BaseDto {
  id: number;

  taskTarget: string;

  operateType: string;

  ifSuccess: string;

  remark: string;
}

export class LogScheduledTaskSelListDto extends PageDto {
  @ApiProperty({ description: '任务目标标识', required: false })
  taskTarget: string;

  @ApiProperty({ description: '执行类型', required: false })
  operateType: string;

  @ApiProperty({ description: '是否成功', required: false })
  ifSuccess: string;

  @ApiProperty({ description: '备注', required: false })
  remark: string;
}

export class LogScheduledTaskSelAllDto {
  @ApiProperty({ description: '任务目标标识', required: false })
  taskTarget: string;

  @ApiProperty({ description: '执行类型', required: false })
  operateType: string;

  @ApiProperty({ description: '是否成功', required: false })
  ifSuccess: string;

  @ApiProperty({ description: '备注', required: false })
  remark: string;
}

export class LogScheduledTaskInsOneDto {
  @ApiProperty({ description: '任务目标标识', required: true })
  @IsNotEmpty({ message: '任务目标标识不能为空' })
  @MaxLength(150, { message: '任务目标标识不能超过150个字符' })
  taskTarget: string;

  @ApiProperty({ description: '执行类型', required: true })
  @IsNotEmpty({ message: '执行类型不能为空' })
  @MaxLength(10, { message: '执行类型不能超过10个字符' })
  operateType: string;

  @ApiProperty({ description: '是否成功', required: true })
  @IsNotEmpty({ message: '是否成功不能为空' })
  @MaxLength(1, { message: '是否成功不能超过1个字符' })
  ifSuccess: string;

  @ApiProperty({ description: '备注', required: false })
  @MaxLength(100, { message: '备注不能超过100个字符' })
  remark: string;
}

export class LogScheduledTaskUpdOneDto extends LogScheduledTaskInsOneDto {
  @ApiProperty({ description: '主键id', required: true })
  @IsNotEmpty({ message: '主键id不能为空' })
  id: number;
}

export class LogScheduledTaskInsMoreDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LogScheduledTaskInsOneDto)
  items: LogScheduledTaskInsOneDto[];
}

export class LogScheduledTaskUpdMoreDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LogScheduledTaskUpdOneDto)
  items: LogScheduledTaskUpdOneDto[];
}
