import { Global, Module } from '@nestjs/common';
import { BaseContextService } from './base-context.service';
import { ClsModule } from "nestjs-cls";

@Global()
@Module({
  imports: [
    ClsModule.forRoot({
      global: true,
      middleware: {
        mount: true,
      },
    }),
  ],
  providers: [BaseContextService],
  exports: [BaseContextService],
})
export class BaseContextModule {
}
