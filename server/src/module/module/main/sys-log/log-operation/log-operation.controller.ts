import { Body, Controller, Delete, Get, Param, ParseArrayPipe, Post, Put, Query, UsePipes } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { LogOperationService } from './log-operation.service';
import { Authorize } from '../../../../../decorator/authorize.decorator';
import { R } from '../../../../../common/R';
import { ValidationPipe } from '../../../../../pipe/validation/validation.pipe';
import { LogOperationSelListDto, LogOperationSelAllDto, LogOperationInsOneDto, LogOperationUpdOneDto } from './dto';

@Controller('/main/sys-log/log-operation')
@ApiTags('主系统/系统日志/系统操作日志')
@ApiBearerAuth()
@UsePipes(new ValidationPipe())
export class LogOperationController {
  constructor(private readonly logOperationService: LogOperationService) {
  }

  @Get()
  @ApiOperation({
    summary: '分页查询系统操作日志',
  })
  @Authorize({
    permission: 'main:sysLog:logOperation:selList',
    label: '分页查询系统操作日志',
  })
  async selLogOperation(@Query() dto: LogOperationSelListDto): Promise<R> {
    return this.logOperationService.selLogOperation(dto);
  }

  @Get('/all')
  @ApiOperation({
    summary: '查询所有系统操作日志',
  })
  @Authorize({
    permission: 'main:sysLog:logOperation:selAll',
    label: '查询所有系统操作日志',
  })
  async selAllLogOperation(@Query() dto: LogOperationSelAllDto): Promise<R> {
    return this.logOperationService.selAllLogOperation(dto);
  }

  @Get('/ids')
  @ApiOperation({
    summary: '查询多个系统操作日志（根据id）',
  })
  @ApiQuery({
    name: 'ids',
    description: 'id列表',
    isArray: true,
    type: Number,
  })
  @Authorize({
    permission: 'main:sysLog:logOperation:selOnes',
    label: '查询多个系统操作日志（根据id）',
  })
  async selOnesLogOperation(@Query() ids: number[]): Promise<R> {
    return this.logOperationService.selOnesLogOperation(ids);
  }

  @Get('/:id')
  @ApiOperation({
    summary: '查询单个系统操作日志',
  })
  @Authorize({
    permission: 'main:sysLog:logOperation:selOne',
    label: '查询单个系统操作日志',
  })
  async selOneLogOperation(@Param('id') id: number): Promise<R> {
    return this.logOperationService.selOneLogOperation(id);
  }

  @Post()
  @ApiOperation({
    summary: '新增系统操作日志',
  })
  @Authorize({
    permission: 'main:sysLog:logOperation:ins',
    label: '新增系统操作日志',
  })
  async insLogOperation(@Body() dto: LogOperationInsOneDto): Promise<R> {
    return this.logOperationService.insLogOperation(dto);
  }

  @Post('/s')
  @ApiOperation({
    summary: '批量新增系统操作日志',
  })
  @ApiBody({
    isArray: true,
    type: LogOperationInsOneDto,
  })
  @Authorize({
    permission: 'main:sysLog:logOperation:inss',
    label: '批量新增系统操作日志',
  })
  async insLogOperations(@Body(
    new ParseArrayPipe({
      items: LogOperationInsOneDto,
    }),
  ) dtos: LogOperationInsOneDto[]): Promise<R> {
    return this.logOperationService.insLogOperations(dtos);
  }

  @Put()
  @ApiOperation({
    summary: '修改系统操作日志',
  })
  @Authorize({
    permission: 'main:sysLog:logOperation:upd',
    label: '修改系统操作日志',
  })
  async updLogOperation(@Body() dto: LogOperationUpdOneDto): Promise<R> {
    return this.logOperationService.updLogOperation(dto);
  }

  @Put('/s')
  @ApiOperation({
    summary: '批量修改系统操作日志',
  })
  @ApiBody({
    isArray: true,
    type: LogOperationUpdOneDto,
  })
  @Authorize({
    permission: 'main:sysLog:logOperation:upds',
    label: '批量修改系统操作日志',
  })
  async updLogOperations(@Body(
    new ParseArrayPipe({
      items: LogOperationUpdOneDto,
    }),
  ) dtos: LogOperationUpdOneDto[]): Promise<R> {
    return this.logOperationService.updLogOperations(dtos);
  }

  @Delete()
  @ApiOperation({
    summary: '删除系统操作日志',
  })
  @ApiBody({
    isArray: true,
    type: Number,
  })
  @Authorize({
    permission: 'main:sysLog:logOperation:del',
    label: '删除系统操作日志',
  })
  async delLogOperation(@Body() ids: number[]): Promise<R> {
    return this.logOperationService.delLogOperation(ids);
  }
}
