import { publicDict } from "@/utils/base.ts";
import { OnlineUserDto } from "@/type/module/main/sysMonitor/onlineUser.ts";

export const onlineUserDict: { [P in keyof OnlineUserDto]: string } = {
  ...publicDict,
  userid: '用户id',
  username: '用户名',
  loginRole: '登录身份',
  loginTime: '登录时间',
  loginIp: '登录ip',
  loginOs: '登录系统',
  loginBrowser: '登录浏览器',
}
