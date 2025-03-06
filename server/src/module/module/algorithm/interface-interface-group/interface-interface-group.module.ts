import { Module } from '@nestjs/common';
import { InterfaceInterfaceGroupController } from './interface-interface-group.controller';
import { InterfaceInterfaceGroupService } from './interface-interface-group.service';

@Module({
  controllers: [InterfaceInterfaceGroupController],
  providers: [InterfaceInterfaceGroupService],
})
export class InterfaceInterfaceGroupModule {
}
