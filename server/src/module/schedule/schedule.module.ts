import { Global, Module } from "@nestjs/common";
import { ScheduleService } from "./schedule.service";
import { ScheduleModule as OriginScheduleModule } from "@nestjs/schedule";

@Global()
@Module({
  imports: [
    OriginScheduleModule.forRoot()
  ],
  providers: [ScheduleService],
  exports: [ScheduleService]
})
export class ScheduleModule {
}
