import { Body, Controller, Delete, Get, Param, ParseArrayPipe, Post, Put, Query, UsePipes } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { LogAlgorithmCallService } from './log-algorithm-call.service';
import { Authorize } from '../../../../decorator/authorizeDecorator';
import { R } from '../../../../common/R';
import { ValidationPipe } from '../../../../pipe/validation/validation.pipe';
import { LogAlgorithmCallSelListDto, LogAlgorithmCallSelAllDto, LogAlgorithmCallInsOneDto, LogAlgorithmCallUpdOneDto } from './dto';

@Controller('/algorithm/log-algorithm-call')
@ApiTags('算法系统/算法调用日志')
@ApiBearerAuth()
@UsePipes(new ValidationPipe())
export class LogAlgorithmCallController {
  constructor(private readonly logAlgorithmCallService: LogAlgorithmCallService) {
  }

  @Get()
  @ApiOperation({
    summary: '分页查询算法调用日志',
  })
  @Authorize({
    permission: 'algorithm:logAlgorithmCall:selList',
    label: '分页查询算法调用日志',
  })
  async selLogAlgorithmCall(@Query() dto: LogAlgorithmCallSelListDto): Promise<R> {
    return this.logAlgorithmCallService.selLogAlgorithmCall(dto);
  }

  @Get('/all')
  @ApiOperation({
    summary: '查询所有算法调用日志',
  })
  @Authorize({
    permission: 'algorithm:logAlgorithmCall:selAll',
    label: '查询所有算法调用日志',
  })
  async selAllLogAlgorithmCall(@Query() dto: LogAlgorithmCallSelAllDto): Promise<R> {
    return this.logAlgorithmCallService.selAllLogAlgorithmCall(dto);
  }

  @Get('/ids')
  @ApiOperation({
    summary: '查询多个算法调用日志（根据id）',
  })
  @ApiQuery({
    name: 'ids',
    description: 'id列表',
    isArray: true,
    type: Number,
  })
  @Authorize({
    permission: 'algorithm:logAlgorithmCall:selOnes',
    label: '查询多个算法调用日志（根据id）',
  })
  async selOnesLogAlgorithmCall(@Query() ids: number[]): Promise<R> {
    return this.logAlgorithmCallService.selOnesLogAlgorithmCall(ids);
  }

  @Get('/:id')
  @ApiOperation({
    summary: '查询单个算法调用日志',
  })
  @Authorize({
    permission: 'algorithm:logAlgorithmCall:selOne',
    label: '查询单个算法调用日志',
  })
  async selOneLogAlgorithmCall(@Param('id') id: number): Promise<R> {
    return this.logAlgorithmCallService.selOneLogAlgorithmCall(id);
  }

  @Post()
  @ApiOperation({
    summary: '新增算法调用日志',
  })
  @Authorize({
    permission: 'algorithm:logAlgorithmCall:ins',
    label: '新增算法调用日志',
  })
  async insLogAlgorithmCall(@Body() dto: LogAlgorithmCallInsOneDto): Promise<R> {
    return this.logAlgorithmCallService.insLogAlgorithmCall(dto);
  }

  @Post('/s')
  @ApiOperation({
    summary: '批量新增算法调用日志',
  })
  @ApiBody({
    isArray: true,
    type: LogAlgorithmCallInsOneDto,
  })
  @Authorize({
    permission: 'algorithm:logAlgorithmCall:inss',
    label: '批量新增算法调用日志',
  })
  async insLogAlgorithmCalls(@Body(
    new ParseArrayPipe({
      items: LogAlgorithmCallInsOneDto,
    }),
  ) dtos: LogAlgorithmCallInsOneDto[]): Promise<R> {
    return this.logAlgorithmCallService.insLogAlgorithmCalls(dtos);
  }

  @Put()
  @ApiOperation({
    summary: '修改算法调用日志',
  })
  @Authorize({
    permission: 'algorithm:logAlgorithmCall:upd',
    label: '修改算法调用日志',
  })
  async updLogAlgorithmCall(@Body() dto: LogAlgorithmCallUpdOneDto): Promise<R> {
    return this.logAlgorithmCallService.updLogAlgorithmCall(dto);
  }

  @Put('/s')
  @ApiOperation({
    summary: '批量修改算法调用日志',
  })
  @ApiBody({
    isArray: true,
    type: LogAlgorithmCallUpdOneDto,
  })
  @Authorize({
    permission: 'algorithm:logAlgorithmCall:upds',
    label: '批量修改算法调用日志',
  })
  async updLogAlgorithmCalls(@Body(
    new ParseArrayPipe({
      items: LogAlgorithmCallUpdOneDto,
    }),
  ) dtos: LogAlgorithmCallUpdOneDto[]): Promise<R> {
    return this.logAlgorithmCallService.updLogAlgorithmCalls(dtos);
  }

  @Delete()
  @ApiOperation({
    summary: '删除算法调用日志',
  })
  @ApiBody({
    isArray: true,
    type: Number,
  })
  @Authorize({
    permission: 'algorithm:logAlgorithmCall:del',
    label: '删除算法调用日志',
  })
  async delLogAlgorithmCall(@Body() ids: number[]): Promise<R> {
    return this.logAlgorithmCallService.delLogAlgorithmCall(ids);
  }
}
