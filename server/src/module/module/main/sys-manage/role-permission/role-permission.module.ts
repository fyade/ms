import { Module } from '@nestjs/common';
import { RolePermissionController } from './role-permission.controller';
import { RolePermissionService } from './role-permission.service';

@Module({
  controllers: [RolePermissionController],
  providers: [RolePermissionService],
})
export class RolePermissionModule {
}
