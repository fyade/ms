import { Injectable } from "@nestjs/common";
import { Job } from "bullmq";
import { LogOperationQueueJobDataDto } from "./dto";
import { ScheduleService } from "../schedule/schedule.service";
import { QueueoService } from "./queueo.service";

@Injectable()
export class QueueService {
  constructor(
    private readonly queueo: QueueoService,
    private readonly scheduleService: ScheduleService,
  ) {
    this.scheduleService.addScheduleFunc('sys:queue:checkLogOperationQueue', this.checkLogOperationQueue.bind(this))
  }

  private async checkLogOperationQueue() {
    const jobs: Job<LogOperationQueueJobDataDto>[] = await this.queueo.getLogOperationQueue().getFailed();
    for (const job of jobs) {
      if (job.data.permission === '-') {
        await this.queueo.getLogOperationQueue().remove(job.id)
      }
    }
  }
}
