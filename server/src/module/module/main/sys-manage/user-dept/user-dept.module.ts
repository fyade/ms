import { Module } from '@nestjs/common';
import { UserDeptController } from './user-dept.controller';
import { UserDeptService } from './user-dept.service';

@Module({
  controllers: [UserDeptController],
  providers: [UserDeptService],
})
export class UserDeptModule {
}
