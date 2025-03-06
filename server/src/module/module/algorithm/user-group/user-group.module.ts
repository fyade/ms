import { Module } from '@nestjs/common';
import { UserGroupController } from './user-group.controller';
import { UserGroupService } from './user-group.service';

@Module({
  controllers: [UserGroupController],
  providers: [UserGroupService],
})
export class UserGroupModule {
}
