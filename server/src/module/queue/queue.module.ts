import { Global, Module } from "@nestjs/common";
import { QueueService } from "./queue.service";
import { BullModule } from "@nestjs/bullmq";
import { currentEnv } from "../../../config/config";
import { QueueoService } from "./queueo.service";
import { LogOperationConsumer } from "./log-operation.consumer";
import { LogScheduledTaskConsumer } from "./log-scheduled-task.consumer";

const redisConfig = currentEnv().redis;

@Global()
@Module({
  imports: [
    BullModule.forRoot({
      connection: {
        host: redisConfig.host,
        port: redisConfig.port,
        password: redisConfig.password,
        db: redisConfig.databaseForQueue,
      },
      defaultJobOptions: {
        removeOnComplete: true,
        removeOnFail: false,
      }
    }),
    BullModule.registerQueue(
      { name: 'log-operation-queue' },
      { name: 'log-scheduled-task-queue' }
    ),
  ],
  providers: [
    QueueService,
    QueueoService,
    LogOperationConsumer,
    LogScheduledTaskConsumer,
  ],
  exports: [
    QueueService,
    QueueoService,
  ]
})
export class QueueModule {
}
