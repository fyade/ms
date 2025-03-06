import { Module } from '@nestjs/common';
import { DicDataController } from './dic-data.controller';
import { DicDataService } from './dic-data.service';

@Module({
  controllers: [DicDataController],
  providers: [DicDataService],
})
export class DicDataModule {
}
