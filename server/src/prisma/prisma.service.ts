import { Injectable } from '@nestjs/common';
import { UnknownException } from '../exception/unknown.exception';
import { PageDto } from '../common/dto/PageDto';
import { PageVo } from '../common/vo/PageVo';
import { deepClone } from '../util/ObjectUtils';
import { PrismaParam, SelectParamObj } from './dto';
import { PrismaoService } from './prismao.service';
import { AuthService } from '../module/auth/auth.service';
import { BaseContextService } from '../module/base-context/base-context.service';
import { T_DEPT, T_ROLE } from '../util/base';
import { baseUtils, objectUtils } from "@ms/common";

@Injectable()
export class PrismaService {
  constructor(
    private readonly authService: AuthService,
    private readonly bcs: BaseContextService,
    private readonly prismao: PrismaoService,
  ) {
  }

  /**
   * 数据表行级别权限控制
   * @param model
   * @param arg
   * @private
   */
  private async tableRowPermission<T>({
                                        model,
                                        arg,
                                      }: {
                                        model: string,
                                        arg: PrismaParam
                                      },
  ): Promise<boolean | string | { key: string, value: (number | string)[] }> {
    const userData = this.bcs.getUserData();
    const permissionData = await this.prismao.getOrigin().sys_menu.findFirst({
      where: {
        perms: userData.perms,
        type: 'mb',
        ...this.prismao.defaultSelArg().where,
      },
    });
    if (!permissionData) {
      console.error(`不存在的权限：${userData.perms}`);
      throw new UnknownException(userData.reqId);
    }
    const ifTopAdmin = userData.topAdmin;
    if (ifTopAdmin) {
      return true;
    }
    // // 用户的角色/部门
    const { allRoleIds, allDeptIds } = await this.authService.rolesAndDeptsOfUser(userData.userId, userData.loginRole);
    const trpsRole = await this.prismao.getOrigin().sys_table_row_permission.findMany({
      where: {
        action_type: T_ROLE,
        action_id: {
          in: allRoleIds.map(_ => `${_}`),
        },
        permission_id: permissionData.id,
        ...this.prismao.defaultSelArg().where,
      },
    });
    const trpsDept = await this.prismao.getOrigin().sys_table_row_permission.findMany({
      where: {
        action_type: T_DEPT,
        action_id: {
          in: allDeptIds.map(_ => `${_}`),
        },
        permission_id: permissionData.id,
        ...this.prismao.defaultSelArg().where,
      },
    });
    const trps = [...trpsRole, ...trpsDept];
    if (trps.length === 0) {
      return true;
    }
    const dataTypes = trps.map(item => item.data_type);
    // 注：同一权限类型同一权限只能设置一个数据类型
    if (dataTypes.length !== (allRoleIds.length + allDeptIds.length)) {
      return true;
    }
    if (dataTypes.includes('ALL')) {
      return true;
    }
    if (dataTypes.includes('SELF')) {
      return 'self';
    }
    if (dataTypes.includes('SELF_ROLE')) {
      // model, JSON.stringify(arg)
    }
  }

  private getModel(model: string) {
    const modelInstance = this.prismao[model];
    if (!modelInstance) {
      throw new UnknownException(this.bcs.getUserData().reqId);
    }
    return modelInstance;
  }

  private genSelParams<T, P = object>({
                                        data,
                                        orderBy,
                                        range = {},
                                        selKeys = [],
                                        notNullKeys = [],
                                        numberKeys = [],
                                        completeMatchingKeys = [],
                                        ifDeleted = true,
                                        ifUseSelfData = false,
                                      }: {
                                        data?: P,
                                        orderBy?: boolean | object,
                                        range?: object,
                                        selKeys?: string[],
                                        notNullKeys?: string[],
                                        numberKeys?: string[],
                                        completeMatchingKeys?: string[],
                                        ifDeleted?: boolean,
                                        ifUseSelfData?: boolean,
                                      } = {},
  ) {
    const data_ = baseUtils.objToSnakeCase(data as object);
    const publicData = this.prismao.defaultSelArg({ selKeys, ifDeleted, ifUseSelfData }).where;
    const ret = {
      AND: [
        ...Object.keys(publicData).reduce((obj, item) => [
          ...obj,
          {
            [item]: publicData[item],
          },
        ], []),
        ...Object.keys(data_).reduce((obj, item) => {
          let datum = '';
          try {
            datum = JSON.parse(data_[item]);
          } catch (e) {
            datum = data_[item];
          }
          // 开始拼接查询条件
          const obj2 = {
            OR: [],
          };
          // 如果这个字段接收到的是对象类型
          if (baseUtils.typeOf(datum) === 'object') {
            const items = { [item]: {} };
            const datum_ = new SelectParamObj(datum as unknown as SelectParamObj);
            for (const itm of Object.keys(datum_)) {
              // 如果指定为数值类型
              if (datum_[itm].type === 'number') {
                switch (baseUtils.typeOf(datum_[itm].value)) {
                  case 'array':
                    items[item][itm] = datum_[itm].value.map(n => Number(n));
                    break;
                  // case 'object':
                  //   items[item][itm] = Object.keys(datum_[itm].value)
                  //     .reduce((obj, key) => ({ ...obj, [key]: Number(datum_[itm].value[key]) }), {});
                  //   break;
                  case 'string':
                    items[item][itm] = Number(datum_[itm].value);
                    break;
                  default:
                    items[item][itm] = datum_[itm].value;
                    break;
                }
              }
              // 如果指定为日期类型
              if (datum_[itm].type === 'date') {
                switch (baseUtils.typeOf(datum_[itm].value)) {
                  case 'array':
                    items[item][itm] = datum_[itm].value.map((n) => new Date(n));
                    break;
                  // case 'object':
                  //   items[item][itm] = Object.keys(datum_[itm].value)
                  //     .reduce((obj, key) => ({ ...obj, [key]: Number(datum_[itm].value[key]) }), {});
                  //   break;
                  case 'string':
                    items[item][itm] = new Date(datum_[itm].value);
                    break;
                  default:
                    items[item][itm] = datum_[itm].value;
                    break;
                }
              }
              // 未指定类型，原样返回
              else {
                items[item][itm] = datum_[itm].value;
              }
              if (itm === 'between') {
                delete items[item][itm];
                const valid0 = objectUtils.ifValid(datum_[itm].value[0]);
                if (valid0) {
                  items[item]['gte'] = datum_[itm].value[0];
                }
                const valid1 = objectUtils.ifValid(datum_[itm].value[1]);
                if (valid1) {
                  items[item]['lte'] = datum_[itm].value[1];
                }
                if (!valid0 && !valid1) {
                  delete items[item];
                }
              }
            }
            if (Object.keys(items).length > 0) {
              obj2.OR.push(items);
            }
          } else {
            // 数字
            if (baseUtils.toSnakeCases(numberKeys).includes(item)) {
              obj2.OR.push({ [item]: Number(datum) });
            }
            // 字符串完整匹配
            else if (baseUtils.toSnakeCases(completeMatchingKeys).includes(item) && !!datum) {
              obj2.OR.push({ [item]: `${datum}` });
            }
            // 字符串模糊匹配
            else {
              obj2.OR.push({ [item]: { contains: `${datum}` } });
            }
            // 可以为空
            if (!baseUtils.toSnakeCases(notNullKeys).includes(item)) {
              obj2.OR.push({ [item]: null });
            }
          }
          if (obj2.OR.length > 0) {
            return [...obj, obj2];
          } else {
            return [...obj];
          }
        }, []),
        ...Object.keys(range).map(item => {
          const retObj = {
            [baseUtils.toSnakeCase(item)]: {
              gte: range[item].gte,
              lte: range[item].lte,
            },
          };
          const gteNotValid = objectUtils.ifNotValid(range[item].gte);
          if (gteNotValid) {
            delete retObj[baseUtils.toSnakeCase(item)].gte
          }
          const lteNotValid = objectUtils.ifNotValid(range[item].lte);
          if (lteNotValid) {
            delete retObj[baseUtils.toSnakeCase(item)].lte
          }
          if (gteNotValid && lteNotValid) {
            return null;
          }
          return retObj
        }).filter(item => item),
      ],
    };
    return ret;
  }

  /**
   * 分页查询
   * @param model
   * @param data
   * @param orderBy
   * @param range
   * @param selKeys
   * @param ifUseSelfData
   */
  async findPage<T, P extends PageDto>(model: string, {
                                         data,
                                         orderBy,
                                         range = {},
                                         selKeys = [],
                                         ifUseSelfData = false,
                                       }: {
                                         data?: P,
                                         orderBy?: boolean | object,
                                         range?: object,
                                         selKeys?: string[],
                                         ifUseSelfData?: boolean,
                                       } = {},
  ): Promise<PageVo<T>> {
    const pageNum = Number(data.pageNum);
    const pageSize = Number(data.pageSize);
    const data2 = deepClone(data);
    delete data2.pageNum;
    delete data2.pageSize;
    const fieldSelectParam = this.bcs.getFieldSelectParam(model);
    const publicData = this.prismao.defaultSelArg({ selKeys, ifDeleted: fieldSelectParam.ifDeleted, ifUseSelfData });
    const arg: PrismaParam = {
      where: this.genSelParams<T, P>({
        data: data2,
        orderBy,
        range,
        selKeys,
        notNullKeys: fieldSelectParam.notNullKeys,
        numberKeys: fieldSelectParam.numberKeys,
        completeMatchingKeys: fieldSelectParam.completeMatchingKeys,
        ifDeleted: fieldSelectParam.ifDeleted,
        ifUseSelfData,
      }),
      ...(publicData.select ? { select: publicData.select } : {}),
      skip: this.getSkipAndTakeFromPNS(pageNum, pageSize).skip,
      take: this.getSkipAndTakeFromPNS(pageNum, pageSize).take,
    };
    if (typeof orderBy === 'boolean' && orderBy) {
      arg['orderBy'] = {
        order_num: 'asc',
      };
    } else if (orderBy) {
      arg['orderBy'] = {
        [baseUtils.toSnakeCase(Object.keys(orderBy)[0])]: Object.values(orderBy)[0],
      };
    } else {
      arg['orderBy'] = {
        create_time: 'desc',
      };
    }
    const model1 = this.getModel(model);
    const list = await model1.findMany(arg);
    const list1 = list.map((item: object) => baseUtils.objToCamelCase(item));
    const arg2 = {
      where: arg.where,
    };
    const count = await model1.count(arg2);
    return new Promise((resolve) => {
      resolve({
        pageNum,
        pageSize,
        list: list1,
        total: count,
        ifFirst: pageNum === 1,
        ifLast: Math.ceil(count / pageSize) === pageNum,
      });
    });
  }

  /**
   * 查询所有
   * @param model
   * @param data
   * @param orderBy
   * @param range
   * @param selKeys
   * @param ifUseSelfData
   */
  async findAll<T, P = object>(model: string, {
                                 data,
                                 orderBy,
                                 range = {},
                                 selKeys = [],
                                 ifUseSelfData = false,
                               }: {
                                 data?: P,
                                 orderBy?: boolean | object,
                                 range?: object,
                                 selKeys?: string[],
                                 ifUseSelfData?: boolean,
                               } = {},
  ): Promise<T[]> {
    const fieldSelectParam = this.bcs.getFieldSelectParam(model);
    const publicData = this.prismao.defaultSelArg({ selKeys, ifDeleted: fieldSelectParam.ifDeleted, ifUseSelfData });
    const arg = {
      where: this.genSelParams<T, P>({
        data,
        orderBy,
        range,
        selKeys,
        notNullKeys: fieldSelectParam.notNullKeys,
        numberKeys: fieldSelectParam.numberKeys,
        completeMatchingKeys: fieldSelectParam.completeMatchingKeys,
        ifDeleted: fieldSelectParam.ifDeleted,
        ifUseSelfData,
      }),
      ...(publicData.select ? { select: publicData.select } : {}),
    };
    if (typeof orderBy === 'boolean' && orderBy) {
      arg['orderBy'] = {
        order_num: 'asc',
      };
    } else if (orderBy) {
      arg['orderBy'] = {
        [baseUtils.toSnakeCase(Object.keys(orderBy)[0])]: Object.values(orderBy)[0],
      };
    } else {
      arg['orderBy'] = {
        create_time: 'desc',
      };
    }
    const res2 = await this.getModel(model).findMany(arg);
    const res3 = res2.map((item: object) => baseUtils.objToCamelCase(item));
    return new Promise(resolve => resolve(res3));
  }

  /**
   * 查询首个
   * @param model
   * @param args
   * @param selKeys
   * @param ifUseSelfData
   */
  async findFirst<T, P = any>(model: string, args?: Partial<P>, {
                                selKeys = [],
                                ifUseSelfData = false,
                              }: {
                                selKeys?: string[],
                                ifUseSelfData?: boolean,
                              } = {},
  ): Promise<T> {
    const fieldSelectParam = this.bcs.getFieldSelectParam(model);
    const publicData = this.prismao.defaultSelArg({ selKeys, ifDeleted: fieldSelectParam.ifDeleted, ifUseSelfData });
    const arg = {
      where: {
        ...publicData.where,
        ...(baseUtils.objToSnakeCase(args) || {}),
      },
      ...(publicData.select ? { select: publicData.select } : {}),
    };
    const first = await this.getModel(model).findFirst(arg);
    const objToCamelCase1 = baseUtils.objToCamelCase<T>(first);
    return new Promise(resolve => resolve(objToCamelCase1));
  }

  /**
   * 查询单个
   * @param model
   * @param id
   * @param selKeys
   * @param ifUseSelfData
   */
  async findById<T>(model: string, id: number | string, {
                      selKeys = [],
                      ifUseSelfData = false,
                    }: {
                      selKeys?: string[],
                      ifUseSelfData?: boolean,
                    } = {},
  ): Promise<T> {
    return this.findFirst<T>(model, { id: id }, { selKeys, ifUseSelfData });
  }

  /**
   * 查询多个（根据id）
   * @param model
   * @param ids
   * @param selKeys
   * @param ifUseSelfData
   */
  async findByIds<T>(model: string, ids: number[] | string[], {
                       selKeys = [],
                       ifUseSelfData = false,
                     }: {
                       selKeys?: string[],
                       ifUseSelfData?: boolean,
                     } = {},
  ): Promise<T[]> {
    const fieldSelectParam = this.bcs.getFieldSelectParam(model);
    const publicData = this.prismao.defaultSelArg({ selKeys, ifDeleted: fieldSelectParam.ifDeleted, ifUseSelfData });
    const arg = {
      where: {
        ...publicData.where,
        id: {
          in: ids,
        },
      },
      ...(publicData.select ? { select: publicData.select } : {}),
    };
    const list = await this.getModel(model).findMany(arg);
    const list2 = ids.map((id) => baseUtils.objToCamelCase<T>(list.find(item => item.id === id)));
    return new Promise(resolve => resolve(list2));
  }

  /**
   * 数量
   * @param model
   * @param data
   * @param range
   * @param ifUseSelfData
   */
  async count<T, P = object>(model: string, {
                               data,
                               range = {},
                               ifUseSelfData = false,
                             }: {
                               data?: P,
                               range?: object,
                               ifUseSelfData?: boolean,
                             } = {},
  ): Promise<number> {
    const fieldSelectParam = this.bcs.getFieldSelectParam(model);
    const arg = {
      where: this.genSelParams<T, P>({
        data,
        range,
        notNullKeys: fieldSelectParam.notNullKeys,
        numberKeys: fieldSelectParam.numberKeys,
        completeMatchingKeys: fieldSelectParam.completeMatchingKeys,
        ifDeleted: fieldSelectParam.ifDeleted,
        ifUseSelfData,
      }),
    };
    const count = await this.getModel(model).count(arg);
    return new Promise(resolve => resolve(count));
  }

  /**
   * 新增
   * @param model
   * @param data
   * @param ifCustomizeId
   */
  async create<T>(model: string, data, {
                    ifCustomizeId = false,
                  }: {
                    ifCustomizeId?: boolean,
                  } = {},
  ): Promise<T> {
    const data2 = deepClone(data);
    if (!ifCustomizeId) {
      delete data2.id;
    }
    const fieldSelectParam = this.bcs.getFieldSelectParam(model);
    const publicData = this.prismao.defaultInsArg({
      ifCreateRole: fieldSelectParam.ifCreateRole,
      ifUpdateRole: fieldSelectParam.ifUpdateRole,
      ifCreateBy: fieldSelectParam.ifCreateBy,
      ifUpdateBy: fieldSelectParam.ifUpdateBy,
      ifCreateTime: fieldSelectParam.ifCreateTime,
      ifUpdateTime: fieldSelectParam.ifUpdateTime,
      ifDeleted: fieldSelectParam.ifDeleted,
    }).data;
    const arg = {
      data: {
        ...(baseUtils.objToSnakeCase(data2) || {}),
        ...publicData,
      },
    };
    const retData = await this.getModel(model).create(arg);
    return new Promise(resolve => resolve(baseUtils.objToCamelCase(retData)));
  }

  /**
   * 批量新增
   * @param model
   * @param data
   * @param ifCustomizeId
   */
  async createMany<T>(model: string, data, {
                        ifCustomizeId = false,
                      }: {
                        ifCustomizeId?: boolean,
                      } = {},
  ): Promise<T> {
    const fieldSelectParam = this.bcs.getFieldSelectParam(model);
    const publicData = this.prismao.defaultInsArg({
      ifCreateRole: fieldSelectParam.ifCreateRole,
      ifUpdateRole: fieldSelectParam.ifUpdateRole,
      ifCreateBy: fieldSelectParam.ifCreateBy,
      ifUpdateBy: fieldSelectParam.ifUpdateBy,
      ifCreateTime: fieldSelectParam.ifCreateTime,
      ifUpdateTime: fieldSelectParam.ifUpdateTime,
      ifDeleted: fieldSelectParam.ifDeleted,
    }).data;
    const arg = {
      data: data.map(dat => {
        if (!ifCustomizeId) {
          delete dat.id;
        }
        return {
          ...(baseUtils.objToSnakeCase(dat) || {}),
          ...publicData,
        };
      }),
    };
    const retData = await this.getModel(model).createMany(arg);
    return new Promise(resolve => resolve(retData));
  }

  /**
   * 修改
   * @param model
   * @param data
   * @param ifUseSelfData
   */
  async updateById<T>(model: string, data?, {
                        ifUseSelfData = false,
                      }: {
                        ifUseSelfData?: boolean
                      } = {},
  ): Promise<T> {
    const id = data.id;
    const data2 = deepClone(data);
    delete data2.id;
    const fieldSelectParam = this.bcs.getFieldSelectParam(model);
    const publicData = this.prismao.defaultUpdArg({
      ifUpdateRole: fieldSelectParam.ifUpdateRole,
      ifUpdateBy: fieldSelectParam.ifUpdateBy,
      ifUpdateTime: fieldSelectParam.ifUpdateTime,
      ifDeleted: fieldSelectParam.ifDeleted,
      ifUseSelfData,
    });
    const arg = {
      where: {
        ...publicData.where,
        id: id,
      },
      data: {
        ...baseUtils.objToSnakeCase(data2),
        ...publicData.data,
      },
    };
    try {
      const retData = await this.getModel(model).update(arg);
      return new Promise(resolve => resolve(baseUtils.objToCamelCase(retData)));
    } catch (e) {
      return new Promise(resolve => resolve(JSON.parse(JSON.stringify({}))));
    }
  }

  /**
   * 批量修改
   * @param model
   * @param data
   * @param ifUseSelfData
   */
  async updateMany<T>(model: string, data?, {
                        ifUseSelfData = false,
                      }: {
                        ifUseSelfData?: boolean
                      } = {},
  ): Promise<T[]> {
    const retArr: T[] = [];
    for (let i = 0; i < data.length; i++) {
      const ret = await this.updateById<T>(model, data[i], {
        ifUseSelfData,
      });
      retArr.push(ret);
    }
    return new Promise(resolve => resolve(retArr));
  }

  /**
   * 批量删除
   * @param model
   * @param ids
   * @param ifUseSelfData
   */
  async deleteById<T>(model: string, ids: number[] | string[], {
                        ifUseSelfData = false,
                      }: {
                        ifUseSelfData?: boolean
                      } = {},
  ): Promise<{ count: number }> {
    const publicData = this.prismao.defaultDelArg({ ifUseSelfData });
    const arg = {
      where: {
        ...publicData.where,
        id: {
          in: ids,
        },
      },
      data: {
        ...publicData.data,
      },
    };
    const many: { count: number } = await this.getModel(model).updateMany(arg);
    return new Promise(resolve => resolve(many));
  }

  /**
   * 条件删除
   * @param model
   * @param key
   * @param values
   * @param ifUseSelfData
   */
  async delete<T>(model: string, key: string, values, {
                    ifUseSelfData = false,
                  }: {
                    ifUseSelfData?: boolean
                  } = {},
  ): Promise<{ count: number }> {
    const publicData = this.prismao.defaultDelArg({ ifUseSelfData });
    const arg = {
      where: {
        ...publicData.where,
        [key]: {
          in: values,
        },
      },
      data: {
        ...publicData.data,
      },
    };
    return this.getModel(model).updateMany(arg);
  }

  private getSkipAndTakeFromPNS(pageNum: number, pageSize: number) {
    return {
      skip: (pageNum - 1) * pageSize,
      take: pageSize,
    };
  }
}
