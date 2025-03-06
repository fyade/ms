import { Module } from '@nestjs/common';
import { DeptSysController } from './dept-sys.controller';
import { DeptSysService } from './dept-sys.service';

@Module({
  controllers: [DeptSysController],
  providers: [DeptSysService]
})
export class DeptSysModule {}
