import { publicDict } from "@/utils/base.ts";
import { LogOperationDto } from "@/type/module/main/sysLog/logOperation.ts";

export const logOperationDict: { [P in keyof LogOperationDto]: string } = {
  ...publicDict,
  reqId: '请求id',
  callIp: '请求源ip',
  hostName: '请求源地址',
  perms: '权限标识',
  userId: '用户id',
  loginRole: '登录身份',
  authType: '认证类型',
  reqParam: '请求参数',
  oldValue: '旧值',
  operateType: '操作类型',
  ifSuccess: '是否成功',
}
