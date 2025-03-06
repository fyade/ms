import { Module } from '@nestjs/common';
import { LogScheduledTaskController } from './log-scheduled-task.controller';
import { LogScheduledTaskService } from './log-scheduled-task.service';

@Module({
  controllers: [LogScheduledTaskController],
  providers: [LogScheduledTaskService]
})
export class LogScheduledTaskModule {}
