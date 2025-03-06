import { Module } from '@nestjs/common';
import { LogAlgorithmCallController } from './log-algorithm-call.controller';
import { LogAlgorithmCallService } from './log-algorithm-call.service';

@Module({
  controllers: [LogAlgorithmCallController],
  providers: [LogAlgorithmCallService],
})
export class LogAlgorithmCallModule {
}
