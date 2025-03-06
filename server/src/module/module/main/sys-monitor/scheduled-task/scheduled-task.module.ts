import { Module } from '@nestjs/common';
import { ScheduledTaskController } from './scheduled-task.controller';
import { ScheduledTaskService } from './scheduled-task.service';

@Module({
  controllers: [ScheduledTaskController],
  providers: [ScheduledTaskService]
})
export class ScheduledTaskModule {}
