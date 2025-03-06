import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PrismaoService } from './prismao.service';

@Global()
@Module({
  providers: [PrismaService, PrismaoService],
  exports: [PrismaService, PrismaoService],
})
export class PrismaModule {
}
