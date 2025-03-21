import { Controller, Get, Param, UsePipes } from '@nestjs/common';
import { AppService } from './app.service';
import { R } from './common/R';
import { Authorize } from './decorator/authorize.decorator';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ValidationPipe } from './pipe/validation/validation.pipe';

@Controller('/sys/base')
@ApiTags('系统')
@ApiBearerAuth()
@UsePipes(new ValidationPipe())
export class AppController {
  constructor(
    private readonly appService: AppService,
  ) {
  }

  @Get()
  @ApiOperation({
    summary: 'Hello World!',
  })
  async getHello(): Promise<R> {
    return this.appService.getHello();
  }

  @Get('/v')
  @ApiOperation({
    summary: '获取系统版本信息',
  })
  @Authorize({
    permission: '-',
    label: '获取系统版本信息',
    ifIgnore: true,
  })
  async getVersion(): Promise<R> {
    return this.appService.getVersion();
  }

  @Get('/time')
  @ApiOperation({
    summary: '获取服务器时间'
  })
  @Authorize({
    permission: '-',
    label: '获取服务器时间',
    ifIgnore: true
  })
  async getTime(): Promise<R> {
    return this.appService.getTime()
  }

  @Get('/system-base-info')
  @ApiOperation({
    summary: '获取系统基本信息',
  })
  @Authorize({
    permission: 'system:home:systemBaseInfo',
    label: '获取系统基本信息',
  })
  async getSystemUsingInfo(): Promise<R> {
    return this.appService.getSystemUsingInfo();
  }

  @Get('/system-all-apis')
  @ApiOperation({
    summary: '获取全部鉴权接口',
  })
  @Authorize({
    permission: 'system:home:systemAllApis',
    label: '获取全部鉴权接口',
  })
  async getAllAuthApis(): Promise<R> {
    return this.appService.getAllAuthApis();
  }

  @Get('/system-all-apis-2')
  @ApiOperation({
    summary: '获取数据库中缺失的鉴权接口',
  })
  @Authorize({
    permission: 'system:home:systemAllApis2',
    label: '获取数据库中缺失的鉴权接口',
  })
  async getAllAuthApis2(): Promise<R> {
    return this.appService.getAllAuthApis2();
  }

  @Get('/system')
  @ApiOperation({
    summary: '获取有权限的系统',
  })
  @Authorize({
    permission: 'system:home:system',
    label: '获取有权限的系统',
  })
  async getSystems(): Promise<R> {
    return this.appService.getSystems();
  }

  @Get('/page/:sysId')
  @ApiOperation({
    summary: '获取有权限的页面',
  })
  @Authorize({
    permission: 'system:home:page',
    label: '获取有权限的页面',
  })
  async getPages(@Param('sysId') sysId: number): Promise<R> {
    return this.appService.getPages(sysId);
  }

  @Get('/button/:sysId')
  @ApiOperation({
    summary: '获取有权限的按钮',
  })
  @Authorize({
    permission: 'system:home:button',
    label: '获取有权限的按钮',
  })
  async getButtons(@Param('sysId') sysId: number): Promise<R> {
    return this.appService.getButtons(sysId);
  }
}
