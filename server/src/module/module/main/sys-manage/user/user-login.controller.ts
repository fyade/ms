import { Body, Controller, Get, Post, Req, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginDto, RegistDto } from './dto';
import { R } from '../../../../../common/R';
import { Authorize } from '../../../../../decorator/authorize.decorator';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { getIpInfoFromRequest } from '../../../../../util/RequestUtils';
import { Request } from 'express';
import { cryptUtils, encryptUtils } from '@ms/common'
import { CacheTokenService } from "../../../../cache/cache.token.service";

@Controller('/sys/user')
@ApiTags('系统/用户登录')
@ApiBearerAuth()
@UsePipes(new ValidationPipe({ transform: true }))
export class UserLoginController {
  constructor(
    private readonly userService: UserService,
    private readonly cacheTokenService: CacheTokenService,
  ) {
  }

  @Post('/generate-key')
  @ApiOperation({
    summary: '生成公钥',
  })
  @Authorize({
    permission: '-',
    label: '生成公钥',
    ifIgnore: true,
    ifIgnoreParamInLog: true,
  })
  async generateKey(): Promise<R> {
    return this.userService.generateKey();
  }

  @Post('/regist')
  @ApiOperation({
    summary: '用户注册（支持不同登录身份）',
  })
  @Authorize({
    permission: '-',
    label: '用户注册（支持不同登录身份）',
    ifIgnore: true,
    ifIgnoreParamInLog: true,
  })
  async regist(@Body() dto: RegistDto): Promise<R> {
    if (dto.psdType === 'b') {
      dto.password = encryptUtils.decrypt(dto.password);
    }
    delete dto.psdType;
    return this.userService.regist(dto);
  }

  @Post('/login')
  @ApiOperation({
    summary: '用户登录（支持不同登录身份）',
  })
  @Authorize({
    permission: '-',
    label: '用户登录（支持不同登录身份）',
    ifIgnore: true,
    ifIgnoreParamInLog: true,
  })
  async login(@Body() dto: LoginDto, @Req() request: Request): Promise<R> {
    if (dto.psdType === 'b') {
      dto.password = encryptUtils.decrypt(dto.password);
    }
    delete dto.psdType;
    const { ip: loginIp, browser: loginBrowser, os: loginOs } = getIpInfoFromRequest(request);
    return this.userService.login(dto, { loginIp, loginBrowser, loginOs });
  }

  @Post('/adminlogin')
  @ApiOperation({
    summary: '管理员登录（支持不同登录身份）',
  })
  @Authorize({
    permission: '-',
    label: '管理员登录（支持不同登录身份）',
    ifIgnore: true,
    ifIgnoreParamInLog: true,
  })
  async adminLogin(@Body() dto: LoginDto, @Req() request: Request): Promise<R> {
    if (dto.psdType === 'b') {
      dto.password = encryptUtils.decrypt(dto.password);
    }
    if (dto.psdType === 'c') {
      const key = await this.cacheTokenService.getPasswordKey(dto.passwordKeyUuid);
      dto.password = await cryptUtils.rsa.decrypt(key.privateKey, dto.password);
    }
    delete dto.psdType;
    const { ip: loginIp, browser: loginBrowser, os: loginOs } = getIpInfoFromRequest(request);
    return this.userService.adminlogin(dto, { loginIp, loginBrowser, loginOs });
  }

  @Post('/log-out')
  @ApiOperation({
    summary: '登出（支持不同登录身份）',
  })
  @Authorize({
    permission: '-',
    label: '登出（支持不同登录身份）',
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
