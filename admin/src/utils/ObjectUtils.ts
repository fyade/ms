import { isProxy, toRaw } from "vue";
import { objectUtils } from "@ms/common";

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
 * 深克隆
 * @param value
 * @param ignoreKeys
 */
export function deepClone<T>(value_: any, {
                               ignoreKeys = []
                             }: {
                               ignoreKeys?: string[]
                             } = {}
): T {
  const value = isProxy(value_) ? toRaw(value_) : value_;
  return objectUtils._deepClone(value, ignoreKeys)
}
