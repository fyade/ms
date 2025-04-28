// 菜单
export enum MenuTypeEnum {
  T_MENU = 'mm',
  T_COMP = 'mc',
  T_IS = 'ma',
  T_Inter = 'mb',
}

export const menuTypeDict = {
  [MenuTypeEnum.T_MENU]: '菜单',
  [MenuTypeEnum.T_COMP]: '组件',
  [MenuTypeEnum.T_IS]: '接口组',
  [MenuTypeEnum.T_Inter]: '接口',
};

// 菜单 IP 限制
export enum TMWLTypeEnum {
  T_IP = 'ip',
  T_HOST = 'ho',
}

export const mIWLTypeDict = {
  [TMWLTypeEnum.T_IP]: 'ip',
  [TMWLTypeEnum.T_HOST]: 'host',
};

// 接口限流
export enum MTTypeEnum {
  T_IP = 'ip',
}

export const mTTypeDict = {
  [MTTypeEnum.T_IP]: 'ip',
};

// 权限身份类型
export enum UTDPTypeEnum {
  T_ROLE = 'ro',
  T_DEPT = 'de',
  T_UG = 'ug',
}

export const uTDPTypeDict = {
  [UTDPTypeEnum.T_ROLE]: '角色',
  [UTDPTypeEnum.T_DEPT]: '部门',
  [UTDPTypeEnum.T_UG]: '用户组',
};

export enum AuthTypeEnum {
  token = 'token',
  apiKey = 'apiKey',
  unknown = '???',
}

export const base = {
  Y: 'Y',
  N: 'N',
  DEV: 'dev',
  TEST: 'test',
  PROD: 'prod',
};
