import { publicDict } from "@/utils/base.ts";
import { UserUserGroupDto } from "@/type/module/algorithm/userUserGroup.ts";

export const userUserGroupDict: { [P in keyof UserUserGroupDto]: string } = {
  ...publicDict,
  userId: '用户id',
  userGroupId: '用户组id',
  loginRole: '登录身份',
}
