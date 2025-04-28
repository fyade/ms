import { Injectable } from "@nestjs/common";
import { ScheduleService } from "../schedule/schedule.service";
import { QueueoService } from "./queueo.service";

@Injectable()
export class QueueService {
  constructor(
    private readonly queueo: QueueoService,
    private readonly scheduleService: ScheduleService,
  ) {
    this.scheduleService.addScheduleFunc('sys:queue:checkFailedQueues', this.checkFailedQueues.bind(this))
  }

  private async checkFailedQueues() {
    return true;
  }
}
