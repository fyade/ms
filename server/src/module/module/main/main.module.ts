import { Module } from '@nestjs/common';
import { FileUploadModule } from './common/file-upload/file-upload.module';
import { SmsModule } from './common/sms/sms.module';
import { UserModule } from './sys-manage/user/user.module';
import { MenuModule } from './sys-manage/menu/menu.module';
import { RoleModule } from './sys-manage/role/role.module';
import { UserRoleModule } from './sys-manage/user-role/user-role.module';
import { RolePermissionModule } from './sys-manage/role-permission/role-permission.module';
import { DicTypeModule } from './sys-manage/dic-type/dic-type.module';
import { DicDataModule } from './sys-manage/dic-data/dic-data.module';
import { CodeGenerationModule } from './sys-util/code-generation/code-generation.module';
import { CodeGenTableModule } from './sys-util/code-gen-table/code-gen-table.module';
import { CodeGenColumnModule } from './sys-util/code-gen-column/code-gen-column.module';
import { LogUserLoginModule } from './sys-log/log-user-login/log-user-login.module';
import { DeptModule } from './sys-manage/dept/dept.module';
import { UserDeptModule } from './sys-manage/user-dept/user-dept.module';
import { DeptPermissionModule } from './sys-manage/dept-permission/dept-permission.module';
import { OnlineUserModule } from './sys-monitor/online-user/online-user.module';
import { LogOperationModule } from './sys-log/log-operation/log-operation.module';
import { SysModule } from './sys-manage/sys/sys.module';
import { RoleSysModule } from './sys-manage/role-sys/role-sys.module';
import { DeptSysModule } from './sys-manage/dept-sys/dept-sys.module';
import { MenuIpWhiteListModule } from './sys-manage/menu-ip-white-list/menu-ip-white-list.module';
import { UserVisitorModule } from './other-user/user-visitor/user-visitor.module';
import { UserTableDefaultPermissionModule } from './other-user/user-table-default-permission/user-table-default-permission.module';
import { TableRowPermissionModule } from './sys-manage/table-row-permission/table-row-permission.module';
import { ScheduledTaskModule } from './sys-monitor/scheduled-task/scheduled-task.module';
import { LogScheduledTaskModule } from './sys-log/log-scheduled-task/log-scheduled-task.module';
import { ViewRealTimeModule } from './sys-log/view-real-time/view-real-time.module';
import { SysConfigModule } from './sys-manage/sys-config/sys-config.module';
import { MenuThrottleModule } from './sys-manage/menu-throttle/menu-throttle.module';

@Module({
  imports: [
    FileUploadModule,
    SmsModule,
    UserModule,
    MenuModule,
    RoleModule,
    UserRoleModule,
    RolePermissionModule,
    DicTypeModule,
    DicDataModule,
    CodeGenerationModule,
    CodeGenTableModule,
    CodeGenColumnModule,
    LogUserLoginModule,
    DeptModule,
    UserDeptModule,
    DeptPermissionModule,
    OnlineUserModule,
    LogOperationModule,
    SysModule,
    RoleSysModule,
    DeptSysModule,
    MenuIpWhiteListModule,
    UserVisitorModule,
    UserTableDefaultPermissionModule,
    TableRowPermissionModule,
    ScheduledTaskModule,
    LogScheduledTaskModule,
    ViewRealTimeModule,
    SysConfigModule,
    MenuThrottleModule,
  ],
})
export class MainModule {}
