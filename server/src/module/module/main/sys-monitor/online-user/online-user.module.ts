import { Module } from '@nestjs/common';
import { OnlineUserController } from './online-user.controller';
import { OnlineUserService } from './online-user.service';

@Module({
  controllers: [OnlineUserController],
  providers: [OnlineUserService]
})
export class OnlineUserModule {}
