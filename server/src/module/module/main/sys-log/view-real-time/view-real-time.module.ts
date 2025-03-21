import { Module } from '@nestjs/common';
import { ViewRealTimeController } from './view-real-time.controller';
import { ViewRealTimeService } from './view-real-time.service';

@Module({
  controllers: [ViewRealTimeController],
  providers: [ViewRealTimeService]
})
export class ViewRealTimeModule {}
