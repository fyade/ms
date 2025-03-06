import { Module } from '@nestjs/common';
import { LogUserLoginController } from './log-user-login.controller';
import { LogUserLoginService } from './log-user-login.service';

@Module({
  controllers: [LogUserLoginController],
  providers: [LogUserLoginService],
})
export class LogUserLoginModule {
}
