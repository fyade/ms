import { BaseDto } from '../../../../../common/dto/BaseDto';
import { PageDto } from '../../../../../common/dto/PageDto';
import { IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ScheduledTaskDto extends BaseDto {
  id: number;

  name: string;

  target: string;

  cronExpression: string;

  orderNum: number;

  ifDisabled: string;

  remark: string;
}

export class ScheduledTaskSelListDto extends PageDto {
  @ApiProperty({ description: '任务名', required: false })
  name: string;

  @ApiProperty({ description: '任务目标标识', required: false })
  target: string;

  @ApiProperty({ description: 'cron表达式', required: false })
  cronExpression: string;

  @ApiProperty({ description: '顺序', required: false })
  orderNum: number;

  @ApiProperty({ description: '是否禁用', required: false })
  ifDisabled: string;

  @ApiProperty({ description: '备注', required: false })
  remark: string;
}

export class ScheduledTaskSelAllDto {
  @ApiProperty({ description: '任务名', required: false })
  name: string;

  @ApiProperty({ description: '任务目标标识', required: false })
  target: string;

  @ApiProperty({ description: 'cron表达式', required: false })
  cronExpression: string;

  @ApiProperty({ description: '顺序', required: false })
  orderNum: number;

  @ApiProperty({ description: '是否禁用', required: false })
  ifDisabled: string;

  @ApiProperty({ description: '备注', required: false })
  remark: string;
}

export class ScheduledTaskInsOneDto {
  @ApiProperty({ description: '任务名', required: true })
  @IsNotEmpty({ message: '任务名不能为空' })
  name: string;

  @ApiProperty({ description: '任务目标标识', required: true })
  @IsNotEmpty({ message: '任务目标标识不能为空' })
  target: string;

  @ApiProperty({ description: 'cron表达式', required: true })
  @IsNotEmpty({ message: 'cron表达式不能为空' })
  cronExpression: string;

  @ApiProperty({ description: '顺序', required: true })
  @Type(() => Number)
  @IsNotEmpty({ message: '顺序不能为空' })
  orderNum: number;

  @ApiProperty({ description: '是否禁用', required: true })
  @IsNotEmpty({ message: '是否禁用不能为空' })
  ifDisabled: string;

  @ApiProperty({ description: '备注', required: false })
  remark: string;
}

export class ScheduledTaskUpdOneDto extends ScheduledTaskInsOneDto {
  @ApiProperty({ description: '主键id', required: true })
  @IsNotEmpty({ message: '主键id不能为空' })
  id: number;
}
