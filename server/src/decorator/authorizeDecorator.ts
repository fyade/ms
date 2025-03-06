import { PreAuthorize, PreAuthorizeParams } from './customDecorator';
import { applyDecorators, UseGuards, UseInterceptors } from '@nestjs/common';
import { PermissionGuard } from '../guard/permissionGuard';
import { ResponseInterceptor } from '../interceptor/responseInterceptor';

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
    PreAuthorize(param_),
    UseGuards(PermissionGuard),
    UseInterceptors(ResponseInterceptor),
  );
}
