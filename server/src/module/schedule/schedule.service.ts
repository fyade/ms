import { Injectable, OnModuleInit } from "@nestjs/common";
import { SchedulerRegistry } from "@nestjs/schedule";
import { PrismaoService } from "../../prisma/prismao.service";
import { CronJob } from "cron";
import { QueueoService } from "../queue/queueo.service";
import { base } from "../../util/base";

@Injectable()
export class ScheduleService implements OnModuleInit {
  constructor(
    private readonly schedulerRegistry: SchedulerRegistry,
    private readonly prismao: PrismaoService,
    private readonly queueoService: QueueoService,
  ) {
  }

  async onModuleInit() {
    await this.init()
  }

  private async init() {
    const tasks = await this.prismao.getOrigin().sys_scheduled_task.findMany({
      where: {
        ...this.prismao.defaultSelArg().where
      }
    });
    for (const task of tasks) {
      if (task.if_disabled === base.N) {
        this.addSchedule(task.target, task.cron_expression)
      }
    }
  }

  private schedules = new Map<string, () => Promise<void>>()

  private addSchedule(name: string, cronExpression: string) {
    const obj = this.schedules.get(name);
    if (!obj) {
      return
    }
    const cronJob = new CronJob(cronExpression, async () => {
      await this.queueoService.addLogScheduledTaskQueue('ins', {
        taskTarget: name,
        operateType: 'by:self',
        ifSuccess: 'O',
        remark: '',
      })
      await obj()
    });
    this.schedulerRegistry.addCronJob(name, cronJob)
    cronJob.start()
  }

  private delSchedule(name: string) {
    const b = this.schedulerRegistry.getCronJobs().has(name);
    if (b) {
      const cronJob = this.schedulerRegistry.getCronJob(name);
      cronJob.stop()
      this.schedulerRegistry.deleteCronJob(name)
    }
  }

  async runScheduleOnce(...names: string[]) {
    for (const name of names) {
      const func = this.schedules.get(name);
      if (func) {
        await func();
      }
    }
  }

  addScheduleFunc(name: string, func: () => Promise<void>) {
    this.schedules.set(name, func)
  }

  dbInsSchedule(name: string, cronExpression: string) {
    this.addSchedule(name, cronExpression)
  }

  dbDelSchedule(name: string) {
    this.delSchedule(name)
  }
}
