import { Module } from '@nestjs/common';
import { InterfaceGroupController } from './interface-group.controller';
import { InterfaceGroupService } from './interface-group.service';

@Module({
  controllers: [InterfaceGroupController],
  providers: [InterfaceGroupService],
})
export class InterfaceGroupModule {
}
