import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { catchError, map, Observable, tap } from 'rxjs';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { PRE_AUTHORIZE_KEY, PreAuthorizeParams } from '../decorator/authorize.decorator';
import { R } from '../common/R';
import { BaseContextService } from '../module/base-context/base-context.service';
import { getIpInfoFromRequest } from '../util/RequestUtils';
import { QueueoService } from '../module/queue/queueo.service';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  constructor(
    private readonly reflector: Reflector,
    private readonly bcs: BaseContextService,
    private readonly queueoService: QueueoService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    const userData = this.bcs.getUserData();
    return next.handle().pipe(
      map((data) => {
        if (typeof data === 'object') {
          data.reqId = userData.reqId;
        }
        return data;
      }),
      tap(async (response: R) => {
        const request: Request = context.switchToHttp().getRequest();
        const authorizeParams = this.reflector.get<PreAuthorizeParams>(PRE_AUTHORIZE_KEY, context.getHandler());
        const { permission, ifIgnoreParamInLog } = authorizeParams;
        const ipInfoFromRequest = getIpInfoFromRequest(request);
        const reqId = userData.reqId;
        const userId = userData.userId;
        const loginRole = userData.loginRole;
        await this.queueoService.addLogOperationQueue('ins', {
          permission: permission,
          request: ipInfoFromRequest,
          ifSuccess: response ? response.code === 200 : 'O',
          ifIgnoreParamInLog: ifIgnoreParamInLog,
          reqBody: request.body,
          reqQuery: request.query,
          reqParam: request.params,
          reqMethod: request.method,
          reqId: reqId,
          userId: userId,
          loginRole: loginRole,
          authType: userData.authType,
          createTime: new Date(),
        });
      }),
      catchError(async (error) => {
        const request: Request = context.switchToHttp().getRequest();
        const authorizeParams = this.reflector.get<PreAuthorizeParams>(PRE_AUTHORIZE_KEY, context.getHandler());
        const { permission, ifIgnoreParamInLog } = authorizeParams;
        const ipInfoFromRequest = getIpInfoFromRequest(request);
        const reqId = userData.reqId;
        const userId = userData.userId;
        const loginRole = userData.loginRole;
        await this.queueoService.addLogOperationQueue('ins', {
          permission: permission,
          request: ipInfoFromRequest,
          ifSuccess: false,
          ifIgnoreParamInLog: ifIgnoreParamInLog,
          reqBody: request.body,
          reqQuery: request.query,
          reqParam: request.params,
          reqMethod: request.method,
          reqId: reqId,
          userId: userId,
          loginRole: loginRole,
          authType: userData.authType,
          createTime: new Date(),
        });
        throw error;
      }),
    );
  }
}
