import { publicDict } from "@/utils/base.ts";
import { UserDeptDto } from "@/type/module/main/sysManage/userDept.ts";

export const userDeptDict: { [P in keyof UserDeptDto]: string } = {
  ...publicDict,
  userId: '用户id',
  deptId: '部门id',
  loginRole: '登录身份',
}
