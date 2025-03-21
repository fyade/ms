import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PRE_AUTHORIZE_KEY, PreAuthorizeParams } from '../decorator/authorize.decorator';
import { AuthService } from '../module/auth/auth.service';
import { Request } from 'express';
import { Exception } from '../exception/exception';

@Injectable()
export class ThrottleGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const authorizeParams = this.reflector.get<PreAuthorizeParams>(PRE_AUTHORIZE_KEY, context.getHandler());
    if (!authorizeParams) {
      return true;
    }
    const request: Request = context.switchToHttp().getRequest();
    const ifThrottle = await this.authService.ifRequestThrottle(request, authorizeParams.permission);
    if (!ifThrottle) {
      await this.authService.insLogOperation(authorizeParams.permission, request, false, {
        remark: '请求过于频繁',
        ifIgnoreParamInLog: authorizeParams.ifIgnoreParamInLog,
      });
      throw new Exception('请求过于频繁，请稍后再试。');
    }
    return true;
  }
}
