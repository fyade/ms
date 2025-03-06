import { Module } from '@nestjs/common';
import { DeptPermissionController } from './dept-permission.controller';
import { DeptPermissionService } from './dept-permission.service';

@Module({
  controllers: [DeptPermissionController],
  providers: [DeptPermissionService],
})
export class DeptPermissionModule {
}
