import { Module } from '@nestjs/common';
import { CodeGenerationController } from './code-generation.controller';
import { CodeGenerationService } from './code-generation.service';

@Module({
  controllers: [CodeGenerationController],
  providers: [CodeGenerationService],
})
export class CodeGenerationModule {
}
