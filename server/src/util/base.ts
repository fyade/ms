export const T_MENU = 'mm'
export const T_COMP = 'mc'
export const T_IS = 'ma'
export const T_Inter = 'mb'
export type T_MENU = 'mm'
export type T_COMP = 'mc'
export type T_IS = 'ma'
export type T_Inter = 'mb'
export type TMenuType = T_MENU | T_COMP | T_IS | T_Inter
export const menuTypeDict = {
  [T_MENU]: '菜单',
  [T_COMP]: '组件',
  [T_IS]: '接口组',
  [T_Inter]: '接口',
};

export const T_IP = 'ip'
export const T_HOST = 'ho'
export type T_IP = 'ip'
export type T_HOST = 'ho'
export type TMIWLType = T_IP | T_HOST
export const mIWLTypeDict = {
  [T_IP]: 'ip',
  [T_HOST]: 'host',
}

export const T_ROLE = 'ro'
export const T_DEPT = 'de'
export const T_UG = 'ug'
export type T_ROLE = 'ro'
export type T_DEPT = 'de'
export type T_UG = 'ug'
export type TUTDPType = T_ROLE | T_DEPT | T_UG
export const uTDPTypeDict = {
  [T_ROLE]: '角色',
  [T_DEPT]: '部门',
  [T_UG]: '用户组',
}

export const base = {
  Y: 'Y',
  N: 'N',
  DEV: 'dev',
  TEST: 'test',
  PROD: 'prod',
};
