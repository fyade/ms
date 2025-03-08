import { Global, Module } from "@nestjs/common";
import { QueueService } from "./queue.service";
import { BullModule } from "@nestjs/bullmq";
import { QueueoService } from "./queueo.service";
import { LogOperationConsumer } from "./log-operation.consumer";
import { LogScheduledTaskConsumer } from "./log-scheduled-task.consumer";
import { serverConfig } from "@ms/config";

const redisConfig = serverConfig.currentConfig().redis;

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
