import request from "@/api/request.ts";
import { ApiConfig } from "@/type/tablePage.ts";
import {
  UserUserGroupDto,
  UserUserGroupUpdDto,
  UserUserGroupUpdUGUDtp,
  UserUserGroupUpdUUGDtp
} from "@/type/module/algorithm/userUserGroup.ts";

export const userUserGroupApi: ApiConfig<UserUserGroupDto, UserUserGroupUpdDto> = {
  /**
   * 分页查询
   * @param params
   */
  selectList: (params) => request({
    url: '/algorithm/user-user-group',
    method: 'GET',
    params: params
  }),
  /**
   * 查询所有
   * @param params
   */
  selectAll: (params) => request({
    url: '/algorithm/user-user-group/all',
    method: 'GET',
    params: params
  }),
  /**
   * 查询单个
   * @param id
   */
  selectById: (id) => request({
    url: `/algorithm/user-user-group/${id}`,
    method: 'GET'
  }),
  /**
   * 查询多个
   * @param ids
   */
  selectByIds: (ids) => request({
    url: `/algorithm/user-user-group/ids`,
    method: 'GET',
    params: ids
  }),
  /**
   * 新增
   * @param obj
   */
  insertOne: (obj) => request({
    url: '/algorithm/user-user-group',
    method: 'POST',
    data: obj
  }),
  /**
   * 修改
   * @param obj
   */
  updateOne: (obj) => request({
    url: '/algorithm/user-user-group',
    method: 'PUT',
    data: obj
  }),
  /**
   * 新增多个
   * @param objs
   */
  insertMore: (objs) => request({
    url: '/algorithm/user-user-group/s',
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
    url: '/algorithm/user-user-group/s',
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
    url: '/algorithm/user-user-group',
    method: 'DELETE',
    data: ids
  })
}

export function userUserGroupUpdUGU(param: UserUserGroupUpdUGUDtp) {
  return request({
    url: `/algorithm/user-user-group/ugu`,
    method: 'POST',
    data: param
  })
}

export function userUserGroupUpdUUG(param: UserUserGroupUpdUUGDtp) {
  return request({
    url: `/algorithm/user-user-group/uug`,
    method: 'POST',
    data: param
  })
}
