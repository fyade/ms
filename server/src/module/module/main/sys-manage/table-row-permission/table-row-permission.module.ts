import { Module } from '@nestjs/common';
import { TableRowPermissionController } from './table-row-permission.controller';
import { TableRowPermissionService } from './table-row-permission.service';

@Module({
  controllers: [TableRowPermissionController],
  providers: [TableRowPermissionService]
})
export class TableRowPermissionModule {}
