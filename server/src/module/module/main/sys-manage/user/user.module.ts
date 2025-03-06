import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserLoginController } from './user-login.controller';
import { LogUserLoginService } from '../../sys-log/log-user-login/log-user-login.service';

@Module({
  controllers: [UserController, UserLoginController],
  providers: [UserService, LogUserLoginService],
})
export class UserModule {
}
