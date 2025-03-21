import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionFilter } from './filter/global-exception.filter';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './module/auth/auth.module';
import { BaseContextModule } from './module/base-context/base-context.module';
import { CacheModule } from './module/cache/cache.module';
import { CommonModule } from "./module/common/common.module";
import { QueueModule } from "./module/queue/queue.module";
import { ScheduleModule } from "./module/schedule/schedule.module";
import { StaticModule } from './module/static/static.module';
import { WinstonModule } from "./module/winston/winston.module";
import { PrismaModule } from './prisma/prisma.module';
import { RedisModule } from './redis/redis.module';
import { AlgorithmModule } from './module/module/algorithm/algorithm.module';
import { MainModule } from './module/module/main/main.module';

@Module({
  imports: [
    AuthModule,
    BaseContextModule,
    CacheModule,
    CommonModule,
    QueueModule,
    ScheduleModule,
    StaticModule,
    WinstonModule,
    PrismaModule,
    RedisModule,
    AlgorithmModule,
    MainModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
    AppService,
  ],
  controllers: [
    AppController,
  ],
})
export class AppModule {
}
