import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { SysConfigService } from './sys-config.service';
import { Authorize } from '../../../../../decorator/authorize.decorator';
import { R } from '../../../../../common/R';
import { SysConfigSelListDto, SysConfigSelAllDto, SysConfigInsOneDto, SysConfigUpdOneDto, SysConfigInsMoreDto, SysConfigUpdMoreDto } from './dto';

@Controller('/main/sys-manage/sys-config')
@ApiTags('主系统/系统管理/系统配置')
@ApiBearerAuth()
@UsePipes(new ValidationPipe({ transform: true }))
export class SysConfigController {
  constructor(private readonly sysConfigService: SysConfigService) {
  }

  @Get()
  @ApiOperation({
    summary: '分页查询系统配置',
  })
  @Authorize({
    permission: 'main:sysManage:sysConfig:selList',
    label: '分页查询系统配置',
  })
  async selSysConfig(@Query() dto: SysConfigSelListDto): Promise<R> {
    return this.sysConfigService.selSysConfig(dto);
  }

  @Get('/all')
  @ApiOperation({
    summary: '查询所有系统配置',
  })
  @Authorize({
    permission: 'main:sysManage:sysConfig:selAll',
    label: '查询所有系统配置',
  })
  async selAllSysConfig(@Query() dto: SysConfigSelAllDto): Promise<R> {
    return this.sysConfigService.selAllSysConfig(dto);
  }

  @Get('/ids')
  @ApiOperation({
    summary: '查询多个系统配置（根据id）',
  })
  @ApiQuery({
    name: 'ids',
    description: 'id列表',
    isArray: true,
    type: Number,
  })
  @Authorize({
    permission: 'main:sysManage:sysConfig:selOnes',
    label: '查询多个系统配置（根据id）',
  })
  async selOnesSysConfig(@Query() ids: number[]): Promise<R> {
    return this.sysConfigService.selOnesSysConfig(ids);
  }

  @Get('/:id')
  @ApiOperation({
    summary: '查询单个系统配置',
  })
  @Authorize({
    permission: 'main:sysManage:sysConfig:selOne',
    label: '查询单个系统配置',
  })
  async selOneSysConfig(@Param('id') id: number): Promise<R> {
    return this.sysConfigService.selOneSysConfig(id);
  }

  @Post()
  @ApiOperation({
    summary: '新增系统配置',
  })
  @Authorize({
    permission: 'main:sysManage:sysConfig:ins',
    label: '新增系统配置',
  })
  async insSysConfig(@Body() dto: SysConfigInsOneDto): Promise<R> {
    return this.sysConfigService.insSysConfig(dto);
  }

  @Post('/s')
  @ApiOperation({
    summary: '批量新增系统配置',
  })
  @ApiBody({
    isArray: true,
    type: SysConfigInsOneDto,
  })
  @Authorize({
    permission: 'main:sysManage:sysConfig:inss',
    label: '批量新增系统配置',
  })
  async insSysConfigs(@Body() dto: SysConfigInsMoreDto): Promise<R> {
    return this.sysConfigService.insSysConfigs(dto.items);
  }

  @Put()
  @ApiOperation({
    summary: '修改系统配置',
  })
  @Authorize({
    permission: 'main:sysManage:sysConfig:upd',
    label: '修改系统配置',
  })
  async updSysConfig(@Body() dto: SysConfigUpdOneDto): Promise<R> {
    return this.sysConfigService.updSysConfig(dto);
  }

  @Put('/s')
  @ApiOperation({
    summary: '批量修改系统配置',
  })
  @ApiBody({
    isArray: true,
    type: SysConfigUpdOneDto,
  })
  @Authorize({
    permission: 'main:sysManage:sysConfig:upds',
    label: '批量修改系统配置',
  })
  async updSysConfigs(@Body() dto: SysConfigUpdMoreDto): Promise<R> {
    return this.sysConfigService.updSysConfigs(dto.items);
  }

  @Delete()
  @ApiOperation({
    summary: '删除系统配置',
  })
  @ApiBody({
    isArray: true,
    type: Number,
  })
  @Authorize({
    permission: 'main:sysManage:sysConfig:del',
    label: '删除系统配置',
  })
  async delSysConfig(@Body() ids: number[]): Promise<R> {
    return this.sysConfigService.delSysConfig(ids);
  }
}
