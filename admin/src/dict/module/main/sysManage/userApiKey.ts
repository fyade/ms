import { publicDict } from "@/utils/base.ts";
import { UserApiKeyDto } from "@/type/module/main/sysManage/userApiKey.ts";

export const userApiKeyDict: { [P in keyof UserApiKeyDto]: string } = {
  ...publicDict,
  userId: '用户id',
  userRole: '用户身份',
  apiKey: 'apiKey',
}
