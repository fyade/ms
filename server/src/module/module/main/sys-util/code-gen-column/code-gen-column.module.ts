import { Module } from '@nestjs/common';
import { CodeGenColumnService } from './code-gen-column.service';
import { CodeGenColumnController } from './code-gen-column.controller';

@Module({
  controllers: [CodeGenColumnController],
  providers: [CodeGenColumnService],
})
export class CodeGenColumnModule {
}
