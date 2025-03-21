import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PRE_AUTHORIZE_KEY, PreAuthorizeParams } from '../decorator/authorize.decorator';
import { AuthService } from '../module/auth/auth.service';
import { ForbiddenException } from '../exception/forbidden.exception';
import { Exception } from '../exception/exception';
import { ParameterException } from '../exception/parameter.exception';
import { AlgorithmDto } from '../module/module/algorithm/algorithm/dto';
import { Request } from 'express';
import { IpNotInWhiteListException } from '../exception/ip-not-in-white-list.exception';
import { genCurrentUser } from '../module/base-context/baseContext';
import { UnauthorizedException } from '../exception/unauthorized.exception';
import { CacheTokenService } from '../module/cache/cache.token.service';
import { BaseContextService } from '../module/base-context/base-context.service';
import { getTokenUuidFromAuth } from '../util/RequestUtils';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly authService: AuthService,
    private readonly cacheTokenService: CacheTokenService,
    private readonly bcs: BaseContextService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const authorizeParams = this.reflector.get<PreAuthorizeParams>(PRE_AUTHORIZE_KEY, context.getHandler());
    const { permission, label, ifSF, ifIgnore, ifIgnoreButResolveToken, ifIgnoreParamInLog } = authorizeParams;
    const request: Request = context.switchToHttp().getRequest();

    let tokenUsable = true;

    if (ifIgnore && !ifIgnoreButResolveToken) {
    } else {
      const oauth = request.headers['authorization'];
      const token = getTokenUuidFromAuth(oauth);
      try {
        const decoded = await this.cacheTokenService.verifyToken(token);
        if (decoded) {
          this.bcs.setUserData(genCurrentUser(decoded.userid, token, decoded.loginRole, permission));
        } else {
          tokenUsable = false;
        }
      } catch (e) {
        tokenUsable = false;
      }
    }

    // 是否有权限
    let ifTrue = false;

    // 放行白名单接口
    if (ifIgnore) {
      ifTrue = true;
    }

    const userId = this.bcs.getUserData().userId;
    const loginRole = this.bcs.getUserData().loginRole;

    // 算法接口权限控制
    if (ifSF) {
      const reqBody = request.body as unknown as AlgorithmDto;
      if (!reqBody.pperms || !reqBody.perms) {
        await this.authService.insLogOperation(permission, request, false, {
          remark: '参数错误，权限标识不可为空。',
          ifIgnoreParamInLog,
        });
        throw new ParameterException('参数错误，权限标识不可为空。');
      }
      if (userId) {
        const permissionsOfUser = await this.authService.hasSFPermissionByUserid(userId, loginRole, reqBody.pperms, reqBody.perms, request);
        if (permissionsOfUser) {
          return true;
        }
      }
      await this.authService.insLogOperation(permission, request, false, {
        remark: '您无当前算法权限。',
        ifIgnoreParamInLog,
      });
      throw new Exception('您无当前算法权限。');
    }

    // 页面接口权限控制

    // 是否被禁用
    const ifDisabled = await this.authService.permissionIfDisabled(permission);
    if (ifDisabled) {
      await this.authService.insLogOperation(permission, request, false, { remark: '接口被禁用', ifIgnoreParamInLog });
      throw new Exception('当前接口被禁用。', 403);
    }
    // 请求ip是否在此接口的ip白名单中
    const ifIpInWhiteList = await this.authService.ifIpInWhiteListOfPermission(permission, request);
    if (!ifIpInWhiteList) {
      await this.authService.insLogOperation(permission, request, false, { remark: '请求源IP不在白名单内。', ifIgnoreParamInLog });
      throw new IpNotInWhiteListException();
    }
    // 是否公共接口
    const ifPublicInterface = await this.authService.ifPublicInterface(permission);
    if (!ifTrue && !tokenUsable && !ifPublicInterface) {
      await this.authService.insLogOperation(permission, request, false, { remark: '401', ifIgnoreParamInLog });
      throw new UnauthorizedException();
    }
    if (ifPublicInterface) {
      ifTrue = true;
    }
    // 是否超级管理员
    const ifTopAdmin = await this.authService.hasTopAdminPermission(loginRole, userId);
    if (ifTopAdmin) {
      this.bcs.setUserToTopAdmin();
      ifTrue = true;
    }
    // 用户是否有当前接口的权限
    if (!ifTrue) {
      const ifHasPermission = await this.authService.hasAdminPermissionByUserid(userId, permission, loginRole);
      if (ifHasPermission) {
        ifTrue = true;
      }
    }
    // 返回
    if (ifTrue) {
      return true;
    }
    await this.authService.insLogOperation(permission, request, false, { remark: '403', ifIgnoreParamInLog });
    throw new ForbiddenException(label);
  }
}
