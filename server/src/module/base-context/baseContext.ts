import { baseInterfaceColumns2 } from '../module/main/sys-util/code-generation/codeGeneration';
import { idUtils } from '@ms/common';
import { AuthTypeEnum } from '../../util/base';

export const USER_INFO_LINSHI_FIELD_NAME = 'user-info-linshi';

export class CurrentUser {
  userId: string;
  token: string;
  reqId: string;
  loginRole: string;
  perms: string;
  topAdmin: boolean;
  authType: AuthTypeEnum;
}

export function genCurrentUser(user?: string, token?: string, loginRole?: string, perms?: string) {
  const currentUser = new CurrentUser();
  currentUser.userId = user;
  currentUser.token = token;
  currentUser.reqId = idUtils.randomUUID();
  currentUser.loginRole = loginRole;
  currentUser.perms = perms;
  currentUser.topAdmin = false;
  currentUser.authType = AuthTypeEnum.unknown;
  return currentUser;
}

export class FieldSelectParam {
  notNullKeys: string[];
  numberKeys: string[];
  completeMatchingKeys: string[];
  ifCreateRole: boolean;
  ifUpdateRole: boolean;
  ifCreateBy: boolean;
  ifUpdateBy: boolean;
  ifCreateTime: boolean;
  ifUpdateTime: boolean;
  ifDeleted: boolean;

  constructor({
    notNullKeys = [],
    numberKeys = [],
    completeMatchingKeys = [],
    ifCreateRole = true,
    ifUpdateRole = true,
    ifCreateBy = true,
    ifUpdateBy = true,
    ifCreateTime = true,
    ifUpdateTime = true,
    ifDeleted = true,
  }: {
    notNullKeys?: string[];
    numberKeys?: string[];
    completeMatchingKeys?: string[];
    ifCreateRole?: boolean;
    ifUpdateRole?: boolean;
    ifCreateBy?: boolean;
    ifUpdateBy?: boolean;
    ifCreateTime?: boolean;
    ifUpdateTime?: boolean;
    ifDeleted?: boolean;
  } = {}) {
    this.notNullKeys = [...baseInterfaceColumns2, ...notNullKeys];
    this.numberKeys = numberKeys;
    this.completeMatchingKeys = completeMatchingKeys;
    this.ifCreateRole = ifCreateRole;
    this.ifUpdateRole = ifUpdateRole;
    this.ifCreateBy = ifCreateBy;
    this.ifUpdateBy = ifUpdateBy;
    this.ifCreateTime = ifCreateTime;
    this.ifUpdateTime = ifUpdateTime;
    this.ifDeleted = ifDeleted;
  }
}
