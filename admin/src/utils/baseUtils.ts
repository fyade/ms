import { deepClone } from "@/utils/ObjectUtils.ts";
import { final } from "@/utils/base.ts";

type Arr2ToDiguiObjI<T, K extends string, V> = T & {
  [P in K]: V
}

/**
 * 二维数组转递归对象
 * @param list
 * @param key
 * @param defaultParent
 * @param ifDeepClone
 */
export function arr2ToDiguiObj<T = any>(list: T[], {
                                          key = 'parentId',
                                          defaultParent = final.DEFAULT_PARENT_ID,
                                          ifDeepClone = true
                                        }: {
                                          key?: string,
                                          defaultParent?: number,
                                          ifDeepClone?: boolean
                                        } = {}
): Arr2ToDiguiObjI<T, typeof key, number>[] {
  const list2 = (ifDeepClone ? deepClone(list) : list) as any[]
  if (list2.length === 0) {
    return []
  }
  const lis = list2.filter(item => item[key] === defaultParent)
  const cachrarr = [lis]
  let finish = false
  while (!finish) {
    const ar = list2.filter(item => cachrarr.flat().map(item => item.id).indexOf(item.id) === -1).filter(item => cachrarr[cachrarr.length - 1].map(item => item.id).indexOf(item[key]) > -1)
    if (ar.length === 0) {
      finish = true
    } else {
      cachrarr.push(ar)
    }
  }
  const ret = []
  if (cachrarr.length === 1) {
    return cachrarr[0]
  }
  for (let i = cachrarr.length - 1; i >= 0; i--) {
    if (i !== 0) {
      cachrarr[i - 1].forEach(obj => {
        obj.children = cachrarr[i].filter(item => item[key] === obj.id)
      })
    } else {
      ret.push(...cachrarr[0])
    }
  }
  return ret
}

/**
 * 递归对象转二维数组
 * @param objs
 * @param key
 * @param jumppaths
 */
export function diguiObjToArr2<T = any>(objs: any[], key: string = 'children', jumppaths = ['']): T[][] {
  return diguiObjToArr2_(objs, key, [], [], jumppaths)
}

function diguiObjToArr2_(objs: any[], key: string, ret: any[] = [], parents: any[] = [], jumppaths = ['']) {
  for (let i = 0; i < objs.length; i++) {
    const obj = objs[i]
    if (jumppaths.indexOf(obj.path) > -1) {
      continue
    }
    if (obj[key] && obj[key].length > 0) {
      ret.push([...parents, obj])
      diguiObjToArr2_(obj[key], key, ret, [...parents, obj])
    } else {
      ret.push([...parents, obj])
    }
  }
  return ret
}

/**
 * 一维数组递归找关系
 * @param objs
 * @param pkey
 * @param ckey
 */
export function arr1GetDiguiRelation(objs: any[], {
                                       pkey = 'parentId',
                                       ckey = 'children'
                                     }: {
                                       pkey?: string,
                                       ckey?: string
                                     } = {}
) {
  objs.forEach(obj => {
    const childrens: any[][] = []
    childrens.push(objs.filter(item => item[pkey] === obj.id))
    while (childrens[childrens.length - 1].length > 0) {
      childrens.push(objs.filter(item => childrens[childrens.length - 1].map(item => item.id).indexOf(item[pkey]) > -1))
    }
    obj[ckey] = childrens.flat().map(item => item.id)
  })
  return objs
}

/**
 * 递归执行
 * @param objs
 * @param func
 * @param key
 */
export function diguiRun<T>(objs: T[], func: (data: { obj: T, parent: T | null }) => void, {
                              key = 'children',
                            }: {
                              key?: string
                            } = {}
) {
  diguiRun2(objs, func, {
    key,
    parent: null
  })
}

function diguiRun2<T>(objs: T[], func: (data: { obj: T, parent: T | null }) => void, {
                        key = 'children',
                        parent = null,
                      }: {
                        key?: string
                        parent: T | null
                      } = {
                        parent: null
                      }
) {
  for (const obj of objs) {
    func({ obj, parent })
    const objElement = obj[key as keyof typeof obj] as T[];
    if (objElement && objElement.length > 0) {
      diguiRun2(objElement, func, { parent: obj })
    }
  }
}
