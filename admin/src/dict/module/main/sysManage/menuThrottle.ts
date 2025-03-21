import { publicDict } from "@/utils/base.ts";
import { MenuThrottleDto } from "@/type/module/main/sysManage/menuThrottle.ts";

export const menuThrottleDict: { [P in keyof MenuThrottleDto]: string } = {
  ...publicDict,
  menuId: '菜单',
  ttl: '单位时长(ms)',
  limit: '次数',
  type: '限制类型',
}
