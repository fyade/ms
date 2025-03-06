import { Module } from '@nestjs/common';
import { UserTableDefaultPermissionController } from './user-table-default-permission.controller';
import { UserTableDefaultPermissionService } from './user-table-default-permission.service';

@Module({
  controllers: [UserTableDefaultPermissionController],
  providers: [UserTableDefaultPermissionService]
})
export class UserTableDefaultPermissionModule {}
