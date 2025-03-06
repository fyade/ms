import { SetMetadata } from '@nestjs/common';

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

export const PreAuthorize = (param: PreAuthorizeParams) => SetMetadata(PRE_AUTHORIZE_KEY, param);
