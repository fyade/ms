import { Injectable } from "@nestjs/common";
import { InjectQueue } from "@nestjs/bullmq";
import { Queue } from "bullmq";
import { LogOperationQueueJobDataDto, LogScheduledTaskQueueJobDataDto } from "./dto";

@Injectable()
export class QueueoService {
  constructor(
    @InjectQueue('log-operation-queue') private readonly logOperationQueue: Queue,
    @InjectQueue('log-scheduled-task-queue') private readonly logScheduledTaskQueue: Queue,
  ) {
  }

  getLogOperationQueue(): Queue {
    return this.logOperationQueue
  }

  async addLogOperationQueue(name: string, data: LogOperationQueueJobDataDto) {
    await this.logOperationQueue.add(name, data)
  }

  async addLogScheduledTaskQueue(name: string, data: LogScheduledTaskQueueJobDataDto) {
    await this.logScheduledTaskQueue.add(name, data)
  }
}
