import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Job } from 'bullmq';
import { LogScheduledTaskQueueJobDataDto } from './dto';
import { PrismaoService } from '../../prisma/prismao.service';

@Processor('log-scheduled-task-queue')
@Injectable()
export class LogScheduledTaskConsumer extends WorkerHost {
  constructor(private readonly prismao: PrismaoService) {
    super();
  }

  async process(job: Job<LogScheduledTaskQueueJobDataDto>) {
    const data = job.data;
    await this.prismao.getOrigin().log_scheduled_task.create({
      data: {
        task_target: data.taskTarget,
        operate_type: data.operateType,
        if_success: data.ifSuccess,
        remark: data.remark,
        create_time: data.createTime,
      },
    });
  }
}
