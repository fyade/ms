import { Module } from '@nestjs/common';
import { UserGroupModule } from './user-group/user-group.module';
import { InterfaceGroupModule } from './interface-group/interface-group.module';
import { UserUserGroupModule } from './user-user-group/user-user-group.module';
import { InterfaceModule } from './interface/interface.module';
import { InterfaceInterfaceGroupModule } from './interface-interface-group/interface-interface-group.module';
import { UserGroupPermissionModule } from './user-group-permission/user-group-permission.module';
import { LogAlgorithmCallModule } from './log-algorithm-call/log-algorithm-call.module';
import { AlgorithmModule as BusinessAlgorithmModule } from './algorithm/algorithm.module';

@Module({
  imports: [
    UserGroupModule,
    InterfaceGroupModule,
    UserUserGroupModule,
    InterfaceModule,
    InterfaceInterfaceGroupModule,
    UserGroupPermissionModule,
    LogAlgorithmCallModule,
    BusinessAlgorithmModule,
  ],
})
export class AlgorithmModule {}
