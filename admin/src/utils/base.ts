import { CascaderProps } from "element-plus";
import { INS, MORE, N, ONE, UPD, Y } from '@/type/utils/base.ts'

export const allLoginRoles: LV[] = [
  {label: '系统管理员', value: 'admin'},
  {label: '访客', value: 'visitor'},
]

export class LV {
  label!: string
  value!: string
}

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

// export const T_IP = 'ip'
// export type T_IP = 'ip'
export const mTTypeDict = {
  [T_IP]: 'ip',
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

export const allTRPDataTypes: LV[] = [
  {label: '全部', value: 'ALL'},
  {label: '本部门', value: 'SELF_DEPT'},
  {label: '本部门及直属子部门', value: 'DEPT_ONE_SON'},
  {label: '本部门及全部子部门', value: 'DEPT_ALL_SON'},
  {label: '本角色', value: 'SELF_ROLE'},
  {label: '自己', value: 'SELF'},
]

export const CONFIG = {
  dialog_width: '800px',
  dialog_width_wider: 'calc(100% - 50px)',
  dialog_form_label_width: '120px',
  drawer_size: 'calc(100% - 200px)',
  icon_white: '#ffffff',
  icon_black: '#000000',
  theme_color_menu_bg_active: '#70a1ff',
  theme_color_menu_bg_active_lighten: '#d5e4ff',
  theme_color_menu_bg_not_active: '#fff',
  theme_color_menu_color: '#fff',
  theme_color_main_bg: '#f1f2f6'
}

export const PAGINATION = {
  pageNum: 1,
  pageSize: 10
}

export const publicDict = {
  id: '主键id',
  remark: '备注',
  orderNum: '顺序',
  ifDefault: '是否默认',
  ifDisabled: '是否禁用',
  createRole: 'createRole',
  updateRole: 'updateRole',
  createBy: 'createBy',
  updateBy: 'updateBy',
  createTime: 'createTime',
  updateTime: 'updateTime',
  deleted: '逻辑删除'
}

export const final: {
  Y: Y
  N: N
  DEFAULT_PARENT_ID: 0
  DEFAULT_ORDER_NUM: 0,
  one: ONE,
  more: MORE,
  ins: INS,
  upd: UPD
} = {
  Y: 'Y',
  N: 'N',
  DEFAULT_PARENT_ID: 0,
  DEFAULT_ORDER_NUM: 0,
  one: 'ONE',
  more: 'MORE',
  ins: 'INS',
  upd: 'UPD'
}

export interface PublicDictInterface {
  id: string,
  remark: string,
  orderNum: string,
  ifDefault: string,
  ifDisabled: string,
  createRole: string,
  updateRole: string,
  createBy: string,
  updateBy: string,
  createTime: string,
  updateTime: string,
  deleted: string
}

export const Operate = {
  success: '操作成功。'
}

export const shift_yes_no = {
  Y: 'N',
  N: 'Y',
}

export const publicCascaderProps = {
  value: 'id',
  label: 'label',
  disabled: 'casDisbaled'
} as CascaderProps
// 只能选择最子层
export const cascaderProps3 = {
  disabled: 'casDisbaled',
  expandTrigger: 'hover',
  emitPath: false // 在选中节点改变时，是否返回由该节点所在的各级菜单的值所组成的数组，若设置 false，则只返回该节点的值
} as CascaderProps
// 可以选择任何层
export const cascaderProps2 = {
  ...publicCascaderProps,
  expandTrigger: 'hover',
  emitPath: false, // 在选中节点改变时，是否返回由该节点所在的各级菜单的值所组成的数组，若设置 false，则只返回该节点的值
  checkStrictly: true // 是否严格的遵守父子节点不互相关联
} as CascaderProps
// 可以选择任何层且支持多选
export const cascaderProps4 = {
  ...cascaderProps2,
  multiple: true
} as CascaderProps
export const cascaderProps1 = {
  ...publicCascaderProps,
  ...cascaderProps3
} as CascaderProps
export const cascaderProps1_ = {
  ...{
    ...publicCascaderProps,
    value: 'perms',
    label: 'name',
  },
  ...cascaderProps3
} as CascaderProps
