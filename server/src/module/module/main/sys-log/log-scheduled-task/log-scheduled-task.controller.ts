import { Body, Controller, Delete, Get, Param, ParseArrayPipe, Post, Put, Query, UsePipes } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { LogScheduledTaskService } from './log-scheduled-task.service';
import { Authorize } from '../../../../../decorator/authorizeDecorator';
import { R } from '../../../../../common/R';
import { ValidationPipe } from '../../../../../pipe/validation/validation.pipe';
import { LogScheduledTaskSelListDto, LogScheduledTaskSelAllDto, LogScheduledTaskInsOneDto, LogScheduledTaskUpdOneDto } from './dto';

@Controller('/main/sys-log/log-scheduled-task')
@ApiTags('主系统/系统日志/定时任务运行日志')
@ApiBearerAuth()
@UsePipes(new ValidationPipe())
export class LogScheduledTaskController {
  constructor(private readonly logScheduledTaskService: LogScheduledTaskService) {
  }

  @Get()
  @ApiOperation({
    summary: '分页查询定时任务运行日志',
  })
  @Authorize({
    permission: 'main:sysLog:logScheduledTask:selList',
    label: '分页查询定时任务运行日志',
  })
  async selLogScheduledTask(@Query() dto: LogScheduledTaskSelListDto): Promise<R> {
    return this.logScheduledTaskService.selLogScheduledTask(dto);
  }

  @Get('/all')
  @ApiOperation({
    summary: '查询所有定时任务运行日志',
  })
  @Authorize({
    permission: 'main:sysLog:logScheduledTask:selAll',
    label: '查询所有定时任务运行日志',
  })
  async selAllLogScheduledTask(@Query() dto: LogScheduledTaskSelAllDto): Promise<R> {
    return this.logScheduledTaskService.selAllLogScheduledTask(dto);
  }

  @Get('/ids')
  @ApiOperation({
    summary: '查询多个定时任务运行日志（根据id）',
  })
  @ApiQuery({
    name: 'ids',
    description: 'id列表',
    isArray: true,
    type: Number,
  })
  @Authorize({
    permission: 'main:sysLog:logScheduledTask:selOnes',
    label: '查询多个定时任务运行日志（根据id）',
  })
  async selOnesLogScheduledTask(@Query() ids: number[]): Promise<R> {
    return this.logScheduledTaskService.selOnesLogScheduledTask(ids);
  }

  @Get('/:id')
  @ApiOperation({
    summary: '查询单个定时任务运行日志',
  })
  @Authorize({
    permission: 'main:sysLog:logScheduledTask:selOne',
    label: '查询单个定时任务运行日志',
  })
  async selOneLogScheduledTask(@Param('id') id: number): Promise<R> {
    return this.logScheduledTaskService.selOneLogScheduledTask(id);
  }

  @Post()
  @ApiOperation({
    summary: '新增定时任务运行日志',
  })
  @Authorize({
    permission: 'main:sysLog:logScheduledTask:ins',
    label: '新增定时任务运行日志',
  })
  async insLogScheduledTask(@Body() dto: LogScheduledTaskInsOneDto): Promise<R> {
    return this.logScheduledTaskService.insLogScheduledTask(dto);
  }

  @Post('/s')
  @ApiOperation({
    summary: '批量新增定时任务运行日志',
  })
  @ApiBody({
    isArray: true,
    type: LogScheduledTaskInsOneDto,
  })
  @Authorize({
    permission: 'main:sysLog:logScheduledTask:inss',
    label: '批量新增定时任务运行日志',
  })
  async insLogScheduledTasks(@Body(
    new ParseArrayPipe({
      items: LogScheduledTaskInsOneDto,
    }),
  ) dtos: LogScheduledTaskInsOneDto[]): Promise<R> {
    return this.logScheduledTaskService.insLogScheduledTasks(dtos);
  }

  @Put()
  @ApiOperation({
    summary: '修改定时任务运行日志',
  })
  @Authorize({
    permission: 'main:sysLog:logScheduledTask:upd',
    label: '修改定时任务运行日志',
  })
  async updLogScheduledTask(@Body() dto: LogScheduledTaskUpdOneDto): Promise<R> {
    return this.logScheduledTaskService.updLogScheduledTask(dto);
  }

  @Put('/s')
  @ApiOperation({
    summary: '批量修改定时任务运行日志',
  })
  @ApiBody({
    isArray: true,
    type: LogScheduledTaskUpdOneDto,
  })
  @Authorize({
    permission: 'main:sysLog:logScheduledTask:upds',
    label: '批量修改定时任务运行日志',
  })
  async updLogScheduledTasks(@Body(
    new ParseArrayPipe({
      items: LogScheduledTaskUpdOneDto,
    }),
  ) dtos: LogScheduledTaskUpdOneDto[]): Promise<R> {
    return this.logScheduledTaskService.updLogScheduledTasks(dtos);
  }

  @Delete()
  @ApiOperation({
    summary: '删除定时任务运行日志',
  })
  @ApiBody({
    isArray: true,
    type: Number,
  })
  @Authorize({
    permission: 'main:sysLog:logScheduledTask:del',
    label: '删除定时任务运行日志',
  })
  async delLogScheduledTask(@Body() ids: number[]): Promise<R> {
    return this.logScheduledTaskService.delLogScheduledTask(ids);
  }
}
