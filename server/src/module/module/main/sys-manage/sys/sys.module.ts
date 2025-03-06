import { Module } from '@nestjs/common';
import { SysController } from './sys.controller';
import { SysService } from './sys.service';

@Module({
  controllers: [SysController],
  providers: [SysService]
})
export class SysModule {}
