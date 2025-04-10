import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { MenuThrottleService } from './menu-throttle.service';
import { Authorize } from '../../../../../decorator/authorize.decorator';
import { R } from '../../../../../common/R';
import { MenuThrottleSelListDto, MenuThrottleSelAllDto, MenuThrottleInsOneDto, MenuThrottleUpdOneDto, MenuThrottleInsMoreDto, MenuThrottleUpdMoreDto } from './dto';

@Controller('/main/sys-manage/menu-throttle')
@ApiTags('主系统/系统管理/请求限速')
@ApiBearerAuth()
@UsePipes(new ValidationPipe({ transform: true }))
export class MenuThrottleController {
  constructor(private readonly menuThrottleService: MenuThrottleService) {
  }

  @Get()
  @ApiOperation({
    summary: '分页查询请求限速',
  })
  @Authorize({
    permission: 'main:sysManage:menuThrottle:selList',
    label: '分页查询请求限速',
  })
  async selMenuThrottle(@Query() dto: MenuThrottleSelListDto): Promise<R> {
    return this.menuThrottleService.selMenuThrottle(dto);
  }

  @Get('/all')
  @ApiOperation({
    summary: '查询所有请求限速',
  })
  @Authorize({
    permission: 'main:sysManage:menuThrottle:selAll',
    label: '查询所有请求限速',
  })
  async selAllMenuThrottle(@Query() dto: MenuThrottleSelAllDto): Promise<R> {
    return this.menuThrottleService.selAllMenuThrottle(dto);
  }

  @Get('/ids')
  @ApiOperation({
    summary: '查询多个请求限速（根据id）',
  })
  @ApiQuery({
    name: 'ids',
    description: 'id列表',
    isArray: true,
    type: Number,
  })
  @Authorize({
    permission: 'main:sysManage:menuThrottle:selOnes',
    label: '查询多个请求限速（根据id）',
  })
  async selOnesMenuThrottle(@Query() ids: number[]): Promise<R> {
    return this.menuThrottleService.selOnesMenuThrottle(ids);
  }

  @Get('/:id')
  @ApiOperation({
    summary: '查询单个请求限速',
  })
  @Authorize({
    permission: 'main:sysManage:menuThrottle:selOne',
    label: '查询单个请求限速',
  })
  async selOneMenuThrottle(@Param('id') id: number): Promise<R> {
    return this.menuThrottleService.selOneMenuThrottle(id);
  }

  @Post()
  @ApiOperation({
    summary: '新增请求限速',
  })
  @Authorize({
    permission: 'main:sysManage:menuThrottle:ins',
    label: '新增请求限速',
  })
  async insMenuThrottle(@Body() dto: MenuThrottleInsOneDto): Promise<R> {
    return this.menuThrottleService.insMenuThrottle(dto);
  }

  @Post('/s')
  @ApiOperation({
    summary: '批量新增请求限速',
  })
  @ApiBody({
    isArray: true,
    type: MenuThrottleInsOneDto,
  })
  @Authorize({
    permission: 'main:sysManage:menuThrottle:inss',
    label: '批量新增请求限速',
  })
  async insMenuThrottles(@Body() dto: MenuThrottleInsMoreDto): Promise<R> {
    return this.menuThrottleService.insMenuThrottles(dto.items);
  }

  @Put()
  @ApiOperation({
    summary: '修改请求限速',
  })
  @Authorize({
    permission: 'main:sysManage:menuThrottle:upd',
    label: '修改请求限速',
  })
  async updMenuThrottle(@Body() dto: MenuThrottleUpdOneDto): Promise<R> {
    return this.menuThrottleService.updMenuThrottle(dto);
  }

  @Put('/s')
  @ApiOperation({
    summary: '批量修改请求限速',
  })
  @ApiBody({
    isArray: true,
    type: MenuThrottleUpdOneDto,
  })
  @Authorize({
    permission: 'main:sysManage:menuThrottle:upds',
    label: '批量修改请求限速',
  })
  async updMenuThrottles(@Body() dto: MenuThrottleUpdMoreDto): Promise<R> {
    return this.menuThrottleService.updMenuThrottles(dto.items);
  }

  @Delete()
  @ApiOperation({
    summary: '删除请求限速',
  })
  @ApiBody({
    isArray: true,
    type: Number,
  })
  @Authorize({
    permission: 'main:sysManage:menuThrottle:del',
    label: '删除请求限速',
  })
  async delMenuThrottle(@Body() ids: number[]): Promise<R> {
    return this.menuThrottleService.delMenuThrottle(ids);
  }
}
