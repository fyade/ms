import { Module } from '@nestjs/common';
import { LogOperationController } from './log-operation.controller';
import { LogOperationService } from './log-operation.service';

@Module({
  controllers: [LogOperationController],
  providers: [LogOperationService],
})
export class LogOperationModule {
}
