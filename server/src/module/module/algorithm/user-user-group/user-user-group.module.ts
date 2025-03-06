import { Module } from '@nestjs/common';
import { UserUserGroupController } from './user-user-group.controller';
import { UserUserGroupService } from './user-user-group.service';

@Module({
  controllers: [UserUserGroupController],
  providers: [UserUserGroupService],
})
export class UserUserGroupModule {
}
