import { Body, Controller, Delete, Get, Param, ParseArrayPipe, Post, Put, Query, UsePipes } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { OnlineUserService } from './online-user.service';
import { ValidationPipe } from '../../../../../pipe/validation/validation.pipe';
import { R } from '../../../../../common/R';
import { Authorize } from '../../../../../decorator/authorize.decorator';
import { OnlineUserSelListDto } from './dto';

@Controller('/main/sys-monitor/online-user')
@ApiTags('主系统/系统监控/在线用户')
@ApiBearerAuth()
@UsePipes(new ValidationPipe())
export class OnlineUserController {
  constructor(private readonly onlineUserService: OnlineUserService) {}

  @Get()
  @ApiOperation({
    summary: '分页查询在线用户',
  })
  @Authorize({
    permission: 'main:sysMonitor:onlineUser:selList',
    label: '分页查询在线用户',
  })
  async selOnlineUserList(@Query() dto: OnlineUserSelListDto): Promise<R> {
    return this.onlineUserService.selOnlineUserList(dto);
  }

  @Delete()
  @ApiOperation({
    summary: '强退用户',
  })
  @ApiBody({
    isArray: true,
    type: String,
  })
  @Authorize({
    permission: 'main:sysMonitor:onlineUser:del',
    label: '强退用户',
  })
  async delOnlineUser(@Body() ids: string[]): Promise<R> {
    return this.onlineUserService.delOnlineUser(ids);
  }
}
