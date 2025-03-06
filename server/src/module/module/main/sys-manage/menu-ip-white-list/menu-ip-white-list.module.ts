import { Module } from '@nestjs/common';
import { MenuIpWhiteListController } from './menu-ip-white-list.controller';
import { MenuIpWhiteListService } from './menu-ip-white-list.service';

@Module({
  controllers: [MenuIpWhiteListController],
  providers: [MenuIpWhiteListService]
})
export class MenuIpWhiteListModule {}
