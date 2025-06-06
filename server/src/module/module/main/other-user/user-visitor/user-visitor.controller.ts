import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { UserVisitorService } from './user-visitor.service';
import { Authorize } from '../../../../../decorator/authorize.decorator';
import { R } from '../../../../../common/R';
import { UserVisitorSelListDto, AdminNewUserVisitorDto, ResetUserVisitorPsdDto } from './dto';
import { encryptUtils } from '@ms/common';

@Controller('/main/other-user/user-visitor')
@ApiTags('主系统/非系统用户管理/访客用户')
@ApiBearerAuth()
@UsePipes(new ValidationPipe({ transform: true }))
export class UserVisitorController {
  constructor(private readonly userVisitorService: UserVisitorService) {
  }

  @Get()
  @ApiOperation({
    summary: '分页查询访客用户',
  })
  @Authorize({
    permission: 'main:otherUser:userVisitor:selList',
    label: '分页查询访客用户',
  })
  async selUserVisitor(@Query() dto: UserVisitorSelListDto): Promise<R> {
    return this.userVisitorService.selUserVisitor(dto);
  }

  @Post('/admin-new')
  @ApiOperation({
    summary: '管理员新增访客用户',
  })
  @Authorize({
    permission: 'main:otherUser:userVisitor:adminNewUserVisitor',
    label: '管理员新增访客用户',
  })
  async insUserVisitor(@Body() dto: AdminNewUserVisitorDto): Promise<R> {
    if (dto.psdType === 'b') {
      dto.password = encryptUtils.decrypt(dto.password);
    }
    delete dto.psdType;
    return this.userVisitorService.insUserVisitor(dto);
  }

  @Post('/admin-reset-user-psd')
  @ApiOperation({
    summary: '管理员重置访客用户密码',
  })
  @Authorize({
    permission: 'main:otherUser:userVisitor:adminResetUserVisitorPsd',
    label: '管理员重置访客用户密码',
  })
  async adminResetUserVisitorPsd(@Body() dto: ResetUserVisitorPsdDto): Promise<R> {
    if (dto.psdType === 'b') {
      dto.password = encryptUtils.decrypt(dto.password);
    }
    delete dto.psdType;
    return this.userVisitorService.adminResetUserVisitorPsd(dto);
  }
}
