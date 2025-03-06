import { Module } from '@nestjs/common';
import { RoleSysController } from './role-sys.controller';
import { RoleSysService } from './role-sys.service';

@Module({
  controllers: [RoleSysController],
  providers: [RoleSysService]
})
export class RoleSysModule {}
