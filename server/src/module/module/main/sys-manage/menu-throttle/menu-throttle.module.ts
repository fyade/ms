import { Module } from '@nestjs/common';
import { MenuThrottleController } from './menu-throttle.controller';
import { MenuThrottleService } from './menu-throttle.service';

@Module({
  controllers: [MenuThrottleController],
  providers: [MenuThrottleService]
})
export class MenuThrottleModule {}
