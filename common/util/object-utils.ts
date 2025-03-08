import { typeOf } from "./base-utils.js";

/**
 * 是否null
 * @param val
 * @returns {boolean}
 */
export function ifNull(val: any) {
  return val === null
}

/**
 * 是否非null
 * @param val
 * @returns {boolean}
 */
export function ifNotNull(val: any) {
  return !ifNull(val)
}

/**
 * 是否undefined
 * @param val
 * @returns {boolean}
 */
export function ifUndefined(val: any) {
  return val === void 0
}

/**
 * 是否非undefined
 * @param val
 * @returns {boolean}
 */
export function ifNotUndefined(val: any) {
  return !ifUndefined(val)
}

/**
 * 是否有效
 * @param val
 * @returns {boolean}
 */
export function ifValid(val: any) {
  return ifNotNull(val) && ifNotUndefined(val)
}

/**
 * 是否无效
 * @param val
 * @returns {boolean}
 */
export function ifNotValid(val: any) {
  return !ifValid(val)
}

/**
 * 两数组是否一样
 * @param arr1
 * @param arr2
 */
export function ifSameArray(arr1: any[], arr2: any[]) {
  return arr1.length === arr2.length && arr1.every((item, index) => arr2[index] === item)
}

/**
 * 对象是否有某键
 * @param obj
 * @param key
 */
export function ifHasKey(obj: object, key: string) {
  return Object.keys(obj).includes(key)
}

/**
 * 数组不重复
 * @param arr
 */
export function arrNoRepeat<T = any>(arr: T[]): T[] {
  return Array.from(new Set(arr));
}

/**
 * 深克隆，由于前后端框架差异，需要在前后端分别二次封装一下
 * @param value
 * @param ignoreKeys
 */
export function _deepClone(value: any, ignoreKeys: string[] = []) {
  function _(value: any, key?: string) {
    if ((key && ignoreKeys.includes(key)) || value === null || !['array', 'object'].includes(typeOf(value))) {
      return value;
    }
    // =====
    // 构造函数及原型等可在这里做处理
    // =====
    const result = Array.isArray(value) ? [] : {} as any;
    for (const key in value) {
      result[key] = _(value[key], key);
    }
    return result;
  }

  return _(value);
}

/**
 * 返回删除数组特定下标位置的数据后的数组
 * @param arr
 * @param indices
 * @returns
 */
export function removeElementsByIndices<T>(arr: T[], ...indices: number[]): T[] {
  return arr.filter((_, index) => !indices.includes(index));
}

/**
 * 复制对象
 * @param to
 * @param from
 * @param ignoreKeys
 */
export function copyObject<T = object>(to: T, from: T, ignoreKeys: string[] = []) {
  for (const key in from) {
    if (!ignoreKeys.includes(key)) {
      to[key] = from[key]
    }
  }
}

/**
 * 清除对象所有值
 * @param to
 */
export function clearObject<T = object>(to: T) {
  for (const key in to) {
    (to as Record<string, string>)![key] = ''
  }
}
