import request from "@/api/request.ts";
import { ApiConfig } from "@/type/tablePage.ts";
import { OnlineUserDto } from "@/type/module/main/sysMonitor/onlineUser.ts";

export const onlineUserApi: ApiConfig<OnlineUserDto> = {
  selectList: (params) => request({
    url: '/main/sys-monitor/online-user',
    method: 'GET',
    params: params,
  }),
  selectAll: () => request({}),
  selectById: () => request({}),
  selectByIds: () => request({}),
  insertOne: () => request({}),
  updateOne: () => request({}),
  insertMore: () => request({}),
  updateMore: () => request({}),
  deleteList: (...ids) => request({
    url: '/main/sys-monitor/online-user',
    method: 'DELETE',
    data: ids
  }),
}
