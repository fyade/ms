import { Body, Controller, Delete, Get, Param, ParseArrayPipe, Post, Put, Query, UsePipes } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ScheduledTaskService } from './scheduled-task.service';
import { Authorize } from '../../../../../decorator/authorize.decorator';
import { R } from '../../../../../common/R';
import { ValidationPipe } from '../../../../../pipe/validation/validation.pipe';
import { ScheduledTaskSelListDto, ScheduledTaskSelAllDto, ScheduledTaskInsOneDto, ScheduledTaskUpdOneDto } from './dto';

@Controller('/main/sys-monitor/scheduled-task')
@ApiTags('主系统/系统监控/定时任务')
@ApiBearerAuth()
@UsePipes(new ValidationPipe())
export class ScheduledTaskController {
  constructor(private readonly scheduledTaskService: ScheduledTaskService) {
  }

  @Get()
  @ApiOperation({
    summary: '分页查询定时任务',
  })
  @Authorize({
    permission: 'main:sysMonitor:scheduledTask:selList',
    label: '分页查询定时任务',
  })
  async selScheduledTask(@Query() dto: ScheduledTaskSelListDto): Promise<R> {
    return this.scheduledTaskService.selScheduledTask(dto);
  }

  @Get('/all')
  @ApiOperation({
    summary: '查询所有定时任务',
  })
  @Authorize({
    permission: 'main:sysMonitor:scheduledTask:selAll',
    label: '查询所有定时任务',
  })
  async selAllScheduledTask(@Query() dto: ScheduledTaskSelAllDto): Promise<R> {
    return this.scheduledTaskService.selAllScheduledTask(dto);
  }

  @Get('/ids')
  @ApiOperation({
    summary: '查询多个定时任务（根据id）',
  })
  @ApiQuery({
    name: 'ids',
    description: 'id列表',
    isArray: true,
    type: Number,
  })
  @Authorize({
    permission: 'main:sysMonitor:scheduledTask:selOnes',
    label: '查询多个定时任务（根据id）',
  })
  async selOnesScheduledTask(@Query() ids: number[]): Promise<R> {
    return this.scheduledTaskService.selOnesScheduledTask(ids);
  }

  @Get('/:id')
  @ApiOperation({
    summary: '查询单个定时任务',
  })
  @Authorize({
    permission: 'main:sysMonitor:scheduledTask:selOne',
    label: '查询单个定时任务',
  })
  async selOneScheduledTask(@Param('id') id: number): Promise<R> {
    return this.scheduledTaskService.selOneScheduledTask(id);
  }

  @Post()
  @ApiOperation({
    summary: '新增定时任务',
  })
  @Authorize({
    permission: 'main:sysMonitor:scheduledTask:ins',
    label: '新增定时任务',
  })
  async insScheduledTask(@Body() dto: ScheduledTaskInsOneDto): Promise<R> {
    return this.scheduledTaskService.insScheduledTask(dto);
  }

  @Post('/s')
  @ApiOperation({
    summary: '批量新增定时任务',
  })
  @ApiBody({
    isArray: true,
    type: ScheduledTaskInsOneDto,
  })
  @Authorize({
    permission: 'main:sysMonitor:scheduledTask:inss',
    label: '批量新增定时任务',
  })
  async insScheduledTasks(@Body(
    new ParseArrayPipe({
      items: ScheduledTaskInsOneDto,
    }),
  ) dtos: ScheduledTaskInsOneDto[]): Promise<R> {
    return this.scheduledTaskService.insScheduledTasks(dtos);
  }

  @Put()
  @ApiOperation({
    summary: '修改定时任务',
  })
  @Authorize({
    permission: 'main:sysMonitor:scheduledTask:upd',
    label: '修改定时任务',
  })
  async updScheduledTask(@Body() dto: ScheduledTaskUpdOneDto): Promise<R> {
    return this.scheduledTaskService.updScheduledTask(dto);
  }

  @Put('/s')
  @ApiOperation({
    summary: '批量修改定时任务',
  })
  @ApiBody({
    isArray: true,
    type: ScheduledTaskUpdOneDto,
  })
  @Authorize({
    permission: 'main:sysMonitor:scheduledTask:upds',
    label: '批量修改定时任务',
  })
  async updScheduledTasks(@Body(
    new ParseArrayPipe({
      items: ScheduledTaskUpdOneDto,
    }),
  ) dtos: ScheduledTaskUpdOneDto[]): Promise<R> {
    return this.scheduledTaskService.updScheduledTasks(dtos);
  }

  @Delete()
  @ApiOperation({
    summary: '删除定时任务',
  })
  @ApiBody({
    isArray: true,
    type: Number,
  })
  @Authorize({
    permission: 'main:sysMonitor:scheduledTask:del',
    label: '删除定时任务',
  })
  async delScheduledTask(@Body() ids: number[]): Promise<R> {
    return this.scheduledTaskService.delScheduledTask(ids);
  }

  @Post('/run')
  @ApiOperation({
    summary: '运行一次定时任务',
  })
  @ApiBody({
    isArray: true,
    type: Number,
  })
  @Authorize({
    permission: 'main:sysMonitor:scheduledTask:runOnce',
    label: '运行一次定时任务',
  })
  async runScheduleTaskOnce(@Body() ids: number[]): Promise<R> {
    return this.scheduledTaskService.runScheduleTaskOnce(ids);
  }
}
