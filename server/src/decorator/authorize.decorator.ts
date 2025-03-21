import { applyDecorators, UseGuards, UseInterceptors, SetMetadata } from '@nestjs/common';
import { PermissionGuard } from '../guard/permission.guard';
import { ResponseInterceptor } from '../interceptor/response.interceptor';

export const PRE_AUTHORIZE_KEY = 'perAuthorize';

export class PreAuthorizeParams {
  // 权限标识
  permission: string;
  // 接口描述
  label: string;
  // 是否算法接口
  ifSF?: boolean;
  // 是否忽略权限控制
  ifIgnore?: boolean;
  // 是否忽略权限控制但仍需要解析token
  ifIgnoreButResolveToken?: boolean;
  // 是否在记录操作日志时不记录参数
  ifIgnoreParamInLog?: boolean;
}

export function Authorize(param: string | PreAuthorizeParams) {
  const param_ = new PreAuthorizeParams();
  if (typeof param === 'string') {
    param_.permission = param;
    param_.label = param;
  } else {
    Object.keys(param).forEach(key => {
      param_[key] = param[key];
    });
  }
  return applyDecorators(
    SetMetadata(PRE_AUTHORIZE_KEY, param_),
    UseGuards(PermissionGuard),
    UseInterceptors(ResponseInterceptor),
  );
}
