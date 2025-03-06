import { Module } from '@nestjs/common';
import { DicTypeController } from './dic-type.controller';
import { DicTypeService } from './dic-type.service';

@Module({
  controllers: [DicTypeController],
  providers: [DicTypeService],
})
export class DicTypeModule {
}
