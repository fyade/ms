import { Body, Controller, Get, Post, Req, UsePipes } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginDto, RegistDto } from './dto';
import { R } from '../../../../../common/R';
import { Authorize } from '../../../../../decorator/authorizeDecorator';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ValidationPipe } from '../../../../../pipe/validation/validation.pipe';
import { decrypt } from '../../../../../util/EncryptUtils';
import { getIpInfoFromRequest } from '../../../../../util/RequestUtils';
import { Request } from 'express';

@Controller('/sys/user')
@ApiTags('主系统/系统管理/用户登录')
@ApiBearerAuth()
@UsePipes(new ValidationPipe())
export class UserLoginController {
  constructor(private readonly userService: UserService) {
  }

  @Post('/regist')
  @ApiOperation({
    summary: '用户注册（支持不同登录角色）',
  })
  @Authorize({
    permission: '-',
    label: '用户注册（支持不同登录角色）',
    ifIgnore: true,
    ifIgnoreParamInLog: true,
  })
  async regist(@Body() dto: RegistDto): Promise<R> {
    if (dto.psdType === 'b') {
      dto.password = decrypt(dto.password);
    }
    delete dto.psdType;
    return this.userService.regist(dto);
  }

  @Post('/login')
  @ApiOperation({
    summary: '用户登录（支持不同登录角色）',
  })
  @Authorize({
    permission: '-',
    label: '用户登录（支持不同登录角色）',
    ifIgnore: true,
    ifIgnoreParamInLog: true,
  })
  async login(@Body() dto: LoginDto, @Req() request: Request): Promise<R> {
    if (dto.psdType === 'b') {
      dto.password = decrypt(dto.password);
    }
    delete dto.psdType;
    const { ip: loginIp, browser: loginBrowser, os: loginOs } = getIpInfoFromRequest(request);
    return this.userService.login(dto, { loginIp, loginBrowser, loginOs });
  }

  @Post('/adminlogin')
  @ApiOperation({
    summary: '管理员登录（支持不同登录角色）',
  })
  @Authorize({
    permission: '-',
    label: '管理员登录（支持不同登录角色）',
    ifIgnore: true,
    ifIgnoreParamInLog: true,
  })
  async adminLogin(@Body() dto: LoginDto, @Req() request: Request): Promise<R> {
    if (dto.psdType === 'b') {
      dto.password = decrypt(dto.password);
    }
    delete dto.psdType;
    const { ip: loginIp, browser: loginBrowser, os: loginOs } = getIpInfoFromRequest(request);
    return this.userService.adminlogin(dto, { loginIp, loginBrowser, loginOs });
  }

  @Post('/log-out')
  @ApiOperation({
    summary: '登出（支持不同登录角色）',
  })
  @Authorize({
    permission: '-',
    label: '登出（支持不同登录角色）',
    ifIgnore: true,
    ifIgnoreButResolveToken: true,
    ifIgnoreParamInLog: true,
  })
  async logOut(): Promise<R> {
    return this.userService.logOut();
  }

  @Get('/verification-code')
  @ApiOperation({
    summary: '获取验证码',
  })
  @Authorize({
    permission: '-',
    label: '获取验证码',
    ifIgnore: true,
    ifIgnoreButResolveToken: true,
    ifIgnoreParamInLog: true,
  })
  async getVerificationCode(): Promise<R> {
    return this.userService.getVerificationCode();
  }
}
