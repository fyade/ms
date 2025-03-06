import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../../prisma/prisma.service';
import { R } from '../../../../../common/R';
import { LogScheduledTaskDto, LogScheduledTaskSelListDto, LogScheduledTaskSelAllDto, LogScheduledTaskInsOneDto, LogScheduledTaskUpdOneDto } from './dto';
import { BaseContextService } from '../../../../base-context/base-context.service';

@Injectable()
export class LogScheduledTaskService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly bcs: BaseContextService,
  ) {
    this.bcs.setFieldSelectParam('log_scheduled_task', {
      notNullKeys: ['taskTarget', 'operateType', 'ifSuccess'],
      ifCreateRole: false,
      ifUpdateRole: false,
      ifCreateBy: false,
      ifUpdateBy: false,
      ifUpdateTime: false,
      ifDeleted: false,
    });
  }

  async selLogScheduledTask(dto: LogScheduledTaskSelListDto): Promise<R> {
    const res = await this.prisma.findPage<LogScheduledTaskDto, LogScheduledTaskSelListDto>('log_scheduled_task', {
      data: dto,
      orderBy: false,
    });
    return R.ok(res);
  }

  async selAllLogScheduledTask(dto: LogScheduledTaskSelAllDto): Promise<R> {
    const res = await this.prisma.findAll<LogScheduledTaskDto>('log_scheduled_task', {
      data: dto,
      orderBy: false,
    });
    return R.ok(res);
  }

  async selOnesLogScheduledTask(ids: number[]): Promise<R> {
    const res = await this.prisma.findByIds<LogScheduledTaskDto>('log_scheduled_task', Object.values(ids).map(n => Number(n)));
    return R.ok(res);
  }

  async selOneLogScheduledTask(id: number): Promise<R> {
    const res = await this.prisma.findById<LogScheduledTaskDto>('log_scheduled_task', Number(id));
    return R.ok(res);
  }

  async insLogScheduledTask(dto: LogScheduledTaskInsOneDto): Promise<R> {
    const res = await this.prisma.create<LogScheduledTaskDto>('log_scheduled_task', dto);
    return R.ok(res);
  }

  async insLogScheduledTasks(dtos: LogScheduledTaskInsOneDto[]): Promise<R> {
    const res = await this.prisma.createMany<LogScheduledTaskDto>('log_scheduled_task', dtos);
    return R.ok(res);
  }

  async updLogScheduledTask(dto: LogScheduledTaskUpdOneDto): Promise<R> {
    const res = await this.prisma.updateById<LogScheduledTaskDto>('log_scheduled_task', dto);
    return R.ok(res);
  }

  async updLogScheduledTasks(dtos: LogScheduledTaskUpdOneDto[]): Promise<R> {
    const res = await this.prisma.updateMany<LogScheduledTaskDto>('log_scheduled_task', dtos);
    return R.ok(res);
  }

  async delLogScheduledTask(ids: number[]): Promise<R> {
    const res = await this.prisma.deleteById<LogScheduledTaskDto>('log_scheduled_task', ids);
    return R.ok(res);
  }
}
