import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { currentEnv } from '../config/config';
import { GlobalExceptionFilter } from './filter/GlobalExceptionFilter';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './module/auth/auth.module';
import { BaseContextModule } from './module/base-context/base-context.module';
import { CacheModule } from './module/cache/cache.module';
import { CommonModule } from "./module/common/common.module";
import { QueueModule } from "./module/queue/queue.module";
import { ScheduleModule } from "./module/schedule/schedule.module";
import { StaticModule } from './module/static/static.module';
import { WinstonModule } from "./module/winston/winston.module";
import { PrismaModule } from './prisma/prisma.module';
import { RedisModule } from './redis/redis.module';
import { FileUploadModule } from './module/module/main/common/file-upload/file-upload.module';
import { SmsModule } from './module/module/main/common/sms/sms.module';
import { UserModule } from './module/module/main/sys-manage/user/user.module';
import { MenuModule } from './module/module/main/sys-manage/menu/menu.module';
import { RoleModule } from './module/module/main/sys-manage/role/role.module';
import { UserRoleModule } from './module/module/main/sys-manage/user-role/user-role.module';
import { RolePermissionModule } from './module/module/main/sys-manage/role-permission/role-permission.module';
import { DicTypeModule } from './module/module/main/sys-manage/dic-type/dic-type.module';
import { DicDataModule } from './module/module/main/sys-manage/dic-data/dic-data.module';
import { CodeGenerationModule } from './module/module/main/sys-util/code-generation/code-generation.module';
import { CodeGenTableModule } from './module/module/main/sys-util/code-gen-table/code-gen-table.module';
import { CodeGenColumnModule } from './module/module/main/sys-util/code-gen-column/code-gen-column.module';
import { LogUserLoginModule } from './module/module/main/sys-log/log-user-login/log-user-login.module';
import { DeptModule } from './module/module/main/sys-manage/dept/dept.module';
import { UserGroupModule } from './module/module/algorithm/user-group/user-group.module';
import { UserDeptModule } from './module/module/main/sys-manage/user-dept/user-dept.module';
import { InterfaceGroupModule } from './module/module/algorithm/interface-group/interface-group.module';
import { DeptPermissionModule } from './module/module/main/sys-manage/dept-permission/dept-permission.module';
import { UserUserGroupModule } from './module/module/algorithm/user-user-group/user-user-group.module';
import { InterfaceModule } from './module/module/algorithm/interface/interface.module';
import { InterfaceInterfaceGroupModule } from './module/module/algorithm/interface-interface-group/interface-interface-group.module';
import { UserGroupPermissionModule } from './module/module/algorithm/user-group-permission/user-group-permission.module';
import { LogAlgorithmCallModule } from './module/module/algorithm/log-algorithm-call/log-algorithm-call.module';
import { OnlineUserModule } from './module/module/main/sys-monitor/online-user/online-user.module';
import { LogOperationModule } from './module/module/main/sys-log/log-operation/log-operation.module';
import { AlgorithmModule } from './module/module/algorithm/algorithm/algorithm.module';
import { SysModule } from './module/module/main/sys-manage/sys/sys.module';
import { RoleSysModule } from './module/module/main/sys-manage/role-sys/role-sys.module';
import { DeptSysModule } from './module/module/main/sys-manage/dept-sys/dept-sys.module';
import { MenuIpWhiteListModule } from './module/module/main/sys-manage/menu-ip-white-list/menu-ip-white-list.module';
import { UserVisitorModule } from './module/module/main/other-user/user-visitor/user-visitor.module';
import { UserTableDefaultPermissionModule } from './module/module/main/other-user/user-table-default-permission/user-table-default-permission.module';
import { TableRowPermissionModule } from './module/module/main/sys-manage/table-row-permission/table-row-permission.module';
import { ScheduledTaskModule } from './module/module/main/sys-monitor/scheduled-task/scheduled-task.module';
import { LogScheduledTaskModule } from './module/module/main/sys-log/log-scheduled-task/log-scheduled-task.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [currentEnv],
    }),
    AuthModule,
    BaseContextModule,
    CacheModule,
    CommonModule,
    QueueModule,
    ScheduleModule,
    StaticModule,
    WinstonModule,
    PrismaModule,
    RedisModule,
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
    UserGroupModule,
    UserDeptModule,
    InterfaceGroupModule,
    DeptPermissionModule,
    UserUserGroupModule,
    InterfaceModule,
    InterfaceInterfaceGroupModule,
    UserGroupPermissionModule,
    LogAlgorithmCallModule,
    OnlineUserModule,
    LogOperationModule,
    AlgorithmModule,
    SysModule,
    RoleSysModule,
    DeptSysModule,
    MenuIpWhiteListModule,
    UserVisitorModule,
    UserTableDefaultPermissionModule,
    TableRowPermissionModule,
    ScheduledTaskModule,
    LogScheduledTaskModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
    AppService,
  ],
  controllers: [
    AppController,
  ],
})
export class AppModule {
}
