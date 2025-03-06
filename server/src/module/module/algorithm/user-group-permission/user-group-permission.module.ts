import { Module } from '@nestjs/common';
import { UserGroupPermissionController } from './user-group-permission.controller';
import { UserGroupPermissionService } from './user-group-permission.service';

@Module({
  controllers: [UserGroupPermissionController],
  providers: [UserGroupPermissionService],
})
export class UserGroupPermissionModule {
}
