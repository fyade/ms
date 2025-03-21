import { Body, Controller, Delete, Get, Param, ParseArrayPipe, Post, Put, Query, UsePipes } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { LogUserLoginService } from './log-user-login.service';
import { Authorize } from '../../../../../decorator/authorize.decorator';
import { R } from '../../../../../common/R';
import { ValidationPipe } from '../../../../../pipe/validation/validation.pipe';
import { LogUserLoginSelListDto, LogUserLoginSelAllDto, LogUserLoginInsOneDto, LogUserLoginUpdOneDto } from './dto';

@Controller('/main/sys-log/log-user-login')
@ApiTags('主系统/系统日志/登录日志')
@ApiBearerAuth()
@UsePipes(new ValidationPipe())
export class LogUserLoginController {
  constructor(private readonly logUserLoginService: LogUserLoginService) {
  }

  @Get()
  @ApiOperation({
    summary: '分页查询登录日志',
  })
  @Authorize({
    permission: 'main:sysLog:logUserLogin:selList',
    label: '分页查询登录日志',
  })
  async selLogUserLogin(@Query() dto: LogUserLoginSelListDto): Promise<R> {
    return this.logUserLoginService.selLogUserLogin(dto);
  }

  @Get('/all')
  @ApiOperation({
    summary: '查询所有登录日志',
  })
  @Authorize({
    permission: 'main:sysLog:logUserLogin:selAll',
    label: '查询所有登录日志',
  })
  async selAllLogUserLogin(@Query() dto: LogUserLoginSelAllDto): Promise<R> {
    return this.logUserLoginService.selAllLogUserLogin(dto);
  }

  @Get('/ids')
  @ApiOperation({
    summary: '查询多个登录日志（根据id）',
  })
  @ApiQuery({
    name: 'ids',
    description: 'id列表',
    isArray: true,
    type: Number,
  })
  @Authorize({
    permission: 'main:sysLog:logUserLogin:selOnes',
    label: '查询多个登录日志（根据id）',
  })
  async selOnesLogUserLogin(@Query() ids: number[]): Promise<R> {
    return this.logUserLoginService.selOnesLogUserLogin(ids);
  }

  @Get('/:id')
  @ApiOperation({
    summary: '查询单个登录日志',
  })
  @Authorize({
    permission: 'main:sysLog:logUserLogin:selOne',
    label: '查询单个登录日志',
  })
  async selOneLogUserLogin(@Param('id') id: number): Promise<R> {
    return this.logUserLoginService.selOneLogUserLogin(id);
  }

  @Post()
  @ApiOperation({
    summary: '新增登录日志',
  })
  @Authorize({
    permission: 'main:sysLog:logUserLogin:ins',
    label: '新增登录日志',
  })
  async insLogUserLogin(@Body() dto: LogUserLoginInsOneDto): Promise<R> {
    return this.logUserLoginService.insLogUserLogin(dto);
  }

  @Post('/s')
  @ApiOperation({
    summary: '批量新增登录日志',
  })
  @ApiBody({
    isArray: true,
    type: LogUserLoginInsOneDto,
  })
  @Authorize({
    permission: 'main:sysLog:logUserLogin:inss',
    label: '批量新增登录日志',
  })
  async insLogUserLogins(@Body(
    new ParseArrayPipe({
      items: LogUserLoginInsOneDto,
    }),
  ) dtos: LogUserLoginInsOneDto[]): Promise<R> {
    return this.logUserLoginService.insLogUserLogins(dtos);
  }

  @Put()
  @ApiOperation({
    summary: '修改登录日志',
  })
  @Authorize({
    permission: 'main:sysLog:logUserLogin:upd',
    label: '修改登录日志',
  })
  async updLogUserLogin(@Body() dto: LogUserLoginUpdOneDto): Promise<R> {
    return this.logUserLoginService.updLogUserLogin(dto);
  }

  @Put('/s')
  @ApiOperation({
    summary: '批量修改登录日志',
  })
  @ApiBody({
    isArray: true,
    type: LogUserLoginUpdOneDto,
  })
  @Authorize({
    permission: 'main:sysLog:logUserLogin:upds',
    label: '批量修改登录日志',
  })
  async updLogUserLogins(@Body(
    new ParseArrayPipe({
      items: LogUserLoginUpdOneDto,
    }),
  ) dtos: LogUserLoginUpdOneDto[]): Promise<R> {
    return this.logUserLoginService.updLogUserLogins(dtos);
  }

  @Delete()
  @ApiOperation({
    summary: '删除登录日志',
  })
  @ApiBody({
    isArray: true,
    type: Number,
  })
  @Authorize({
    permission: 'main:sysLog:logUserLogin:del',
    label: '删除登录日志',
  })
  async delLogUserLogin(@Body() ids: number[]): Promise<R> {
    return this.logUserLoginService.delLogUserLogin(ids);
  }
}
