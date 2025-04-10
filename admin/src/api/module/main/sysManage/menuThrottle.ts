import request from "@/api/request.ts";
import { ApiConfig } from "@/type/tablePage.ts";
import { MenuThrottleDto, MenuThrottleUpdDto } from "@/type/module/main/sysManage/menuThrottle.ts";

export const menuThrottleApi: ApiConfig<MenuThrottleDto, MenuThrottleUpdDto> = {
  /**
   * 分页查询
   * @param params
   */
  selectList: (params) => request({
    url: '/main/sys-manage/menu-throttle',
    method: 'GET',
    params: params
  }),
  /**
   * 查询所有
   * @param params
   */
  selectAll: (params) => request({
    url: '/main/sys-manage/menu-throttle/all',
    method: 'GET',
    params: params
  }),
  /**
   * 查询单个
   * @param id
   */
  selectById: (id) => request({
    url: `/main/sys-manage/menu-throttle/${id}`,
    method: 'GET'
  }),
  /**
   * 查询多个
   * @param ids
   */
  selectByIds: (ids) => request({
    url: `/main/sys-manage/menu-throttle/ids`,
    method: 'GET',
    params: ids
  }),
  /**
   * 新增
   * @param obj
   */
  insertOne: (obj) => request({
    url: '/main/sys-manage/menu-throttle',
    method: 'POST',
    data: obj
  }),
  /**
   * 修改
   * @param obj
   */
  updateOne: (obj) => request({
    url: '/main/sys-manage/menu-throttle',
    method: 'PUT',
    data: obj
  }),
  /**
   * 新增多个
   * @param objs
   */
  insertMore: (objs) => request({
    url: '/main/sys-manage/menu-throttle/s',
    method: 'POST',
    data: {
      items: objs,
    }
  }),
  /**
   * 修改多个
   * @param objs
   */
  updateMore: (objs) => request({
    url: '/main/sys-manage/menu-throttle/s',
    method: 'PUT',
    data: {
      items: objs,
    }
  }),
  /**
   * 删除
   * @param ids
   */
  deleteList: (...ids) => request({
    url: '/main/sys-manage/menu-throttle',
    method: 'DELETE',
    data: ids
  })
}
