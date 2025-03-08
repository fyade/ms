import { objectUtils } from "@ms/common";

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
  return objectUtils._deepClone(value, ignoreKeys);
}
