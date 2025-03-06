import { BaseDto } from '../../../../../common/dto/BaseDto';
import { PageDto } from '../../../../../common/dto/PageDto';
import { IsNotEmpty } from 'class-validator';
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
  taskTarget: string;

  @ApiProperty({ description: '执行类型', required: true })
  @IsNotEmpty({ message: '执行类型不能为空' })
  operateType: string;

  @ApiProperty({ description: '是否成功', required: true })
  @IsNotEmpty({ message: '是否成功不能为空' })
  ifSuccess: string;

  @ApiProperty({ description: '备注', required: false })
  remark: string;
}

export class LogScheduledTaskUpdOneDto extends LogScheduledTaskInsOneDto {
  @ApiProperty({ description: '主键id', required: true })
  @IsNotEmpty({ message: '主键id不能为空' })
  id: number;
}
