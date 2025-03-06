import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../../prisma/prisma.service';
import { R } from '../../../../../common/R';
import { ScheduledTaskDto, ScheduledTaskSelListDto, ScheduledTaskSelAllDto, ScheduledTaskInsOneDto, ScheduledTaskUpdOneDto } from './dto';
import { BaseContextService } from '../../../../base-context/base-context.service';
import { ScheduleService } from "../../../../schedule/schedule.service";
import { base } from "../../../../../util/base";

@Injectable()
export class ScheduledTaskService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly bcs: BaseContextService,
    private readonly scheduleService: ScheduleService,
  ) {
    this.bcs.setFieldSelectParam('sys_scheduled_task', {
      notNullKeys: ['name', 'target', 'cronExpression', 'orderNum', 'ifDisabled'],
      numberKeys: ['orderNum'],
    });
  }

  async selScheduledTask(dto: ScheduledTaskSelListDto): Promise<R> {
    const res = await this.prisma.findPage<ScheduledTaskDto, ScheduledTaskSelListDto>('sys_scheduled_task', {
      data: dto,
      orderBy: true,
    });
    return R.ok(res);
  }

  async selAllScheduledTask(dto: ScheduledTaskSelAllDto): Promise<R> {
    const res = await this.prisma.findAll<ScheduledTaskDto>('sys_scheduled_task', {
      data: dto,
      orderBy: true,
    });
    return R.ok(res);
  }

  async selOnesScheduledTask(ids: number[]): Promise<R<ScheduledTaskDto[]>> {
    const res = await this.prisma.findByIds<ScheduledTaskDto>('sys_scheduled_task', Object.values(ids).map(n => Number(n)));
    return R.ok(res);
  }

  async selOneScheduledTask(id: number): Promise<R<ScheduledTaskDto>> {
    const res = await this.prisma.findById<ScheduledTaskDto>('sys_scheduled_task', Number(id));
    return R.ok(res);
  }

  async insScheduledTask(dto: ScheduledTaskInsOneDto): Promise<R> {
    const res = await this.prisma.create<ScheduledTaskDto>('sys_scheduled_task', dto);
    if (res.ifDisabled === base.N) {
      this.scheduleService.dbInsSchedule(res.target, res.cronExpression);
    }
    return R.ok(res);
  }

  async insScheduledTasks(dtos: ScheduledTaskInsOneDto[]): Promise<R> {
    const res = await this.prisma.createMany<ScheduledTaskDto>('sys_scheduled_task', dtos);
    return R.ok(res);
  }

  async updScheduledTask(dto: ScheduledTaskUpdOneDto): Promise<R> {
    const oldTask = await this.selOneScheduledTask(dto.id);
    const res = await this.prisma.updateById<ScheduledTaskDto>('sys_scheduled_task', dto);
    this.scheduleService.dbDelSchedule(oldTask.data.target)
    if (res.ifDisabled === base.N) {
      this.scheduleService.dbInsSchedule(res.target, res.cronExpression)
    }
    return R.ok(res);
  }

  async updScheduledTasks(dtos: ScheduledTaskUpdOneDto[]): Promise<R> {
    const res = await this.prisma.updateMany<ScheduledTaskDto>('sys_scheduled_task', dtos);
    return R.ok(res);
  }

  async delScheduledTask(ids: number[]): Promise<R> {
    const r = await this.selOnesScheduledTask(ids);
    for (const datum of r.data) {
      this.scheduleService.dbDelSchedule(datum.target)
    }
    const res = await this.prisma.deleteById<ScheduledTaskDto>('sys_scheduled_task', ids);
    return R.ok(res);
  }
}
