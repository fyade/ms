import { publicDict } from "@/utils/base.ts";
import { SysConfigDto } from "@/type/module/main/sysManage/sysConfig.ts";

export const sysConfigDict: { [P in keyof SysConfigDto]: string } = {
  ...publicDict,
  ifAllowUserRegist: '是否允许新用户注册',
}
