import { Module } from '@nestjs/common';
import { CodeGenTableController } from './code-gen-table.controller';
import { CodeGenTableService } from './code-gen-table.service';

@Module({
  controllers: [CodeGenTableController],
  providers: [CodeGenTableService],
})
export class CodeGenTableModule {
}
