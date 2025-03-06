import { Global, Module } from "@nestjs/common";
import { WinstonService } from "./winston.service";

@Global()
@Module({
  providers: [WinstonService],
  exports: [WinstonService]
})
export class WinstonModule {
}
