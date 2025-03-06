import { typeOf } from './BaseUtils';

/**
 * 深克隆
 * @param value
 * @param ignoreKeys
 */
export function deepClone<T = any>(value: T, {
                                     ignoreKeys = [],
                                   }: {
                                     ignoreKeys?: string[]
                                   } = {},
): T {
  function _deepClone(value: any, key?: string) {
    if ((key && ignoreKeys.includes(key)) || value === null || !['array', 'object'].includes(typeOf(value))) {
      return value;
    }
    // =====
    // 构造函数及原型等可在这里做处理
    // =====
    const result = Array.isArray(value) ? [] : {} as any;
    for (const key in value) {
      result[key] = _deepClone(value[key], key);
    }
    return result;
  }

  return _deepClone(value);
}

/**
 * 数组不重复
 * @param arr
 */
export function arrNoRepeat<T = any>(arr: T[]): T[] {
  return Array.from(new Set(arr));
}
