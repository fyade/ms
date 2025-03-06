import { Module } from '@nestjs/common';
import { InterfaceController } from './interface.controller';
import { InterfaceService } from './interface.service';

@Module({
  controllers: [InterfaceController],
  providers: [InterfaceService],
})
export class InterfaceModule {
}
