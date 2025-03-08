/**
 * 类型
 * @param param
 * @returns
 */
export function typeOf(param: any) {
  if (typeof param === 'object') {
    return Object.prototype.toString.call(param).slice(8, -1).toLowerCase()
  } else {
    return typeof param
  }
}

/**
 * sleep
 * @param ms
 */
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * 生成随机数
 * @param min
 * @param max
 * @param decimalPlaces
 */
export function randomNumber(min: number, max: number, decimalPlaces: number): number {
  if (min > max) {
    throw new Error('最小值不能大于最大值');
  }
  const factor = Math.pow(10, decimalPlaces);
  const randomNum = Math.random() * (max - min) + min;
  return Math.round(randomNum * factor) / factor;
}

/**
 * 下划线转驼峰
 * @param str
 */
export function toCamelCase<T = string>(str: string): T {
  return str.replace(/[-_]([a-z])/g, (all, i) => i.toUpperCase()) as T;
}

/**
 * 下划线转驼峰
 * @param strs
 */
export function toCamelCases(strs: string[]): string[] {
  return strs.map(str => toCamelCase(str));
}

/**
 * 驼峰转下划线
 * @param str
 */
export function toSnakeCase(str: string): string {
  return str.replace(/([A-Z])/g, '_$1').toLowerCase();
}

/**
 * 驼峰转下划线
 * @param strs
 */
export function toSnakeCases(strs: string[]): string[] {
  return strs.map(str => toSnakeCase(str));
}

/**
 * 驼峰转短横线
 * @param str
 */
export function toKebabCase(str: string): string {
  return str.replace(/([A-Z])/g, '-$1').toLowerCase();
}

/**
 * 驼峰转短横线
 * @param strs
 */
export function toKebabCases(strs: string[]): string[] {
  return strs.map(str => toKebabCase(str));
}

/**
 * 首字母大写
 * @param str
 */
export function capitalizeFirstLetter<T extends string>(str: T): Capitalize<T> {
  return str.charAt(0).toUpperCase() + str.slice(1) as Capitalize<T>;
}

/**
 * 首字母小写
 * @param str
 */
export function lowercaseFirstLetter<T extends string>(str: T): Uncapitalize<T> {
  return str.charAt(0).toLowerCase() + str.slice(1) as Uncapitalize<T>;
}

type ObjectType = Record<string, any>;

/**
 * 对象的key下划线命名转驼峰命名
 * @param obj
 */
export function objToCamelCase<T extends ObjectType>(obj: object): T {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }
  const newObj = obj instanceof Date ? obj : Array.isArray(obj) ? [] : {} as any;
  for (const key in obj) {
    const newKey = key.replace(/_([a-z])/g, (match, char) => char.toUpperCase()) as keyof any;
    newObj[newKey] = objToCamelCase(obj[key as keyof typeof obj]);
  }
  return newObj as T;
}

/**
 * 对象的key驼峰命名转下划线命名
 * @param obj
 */
export function objToSnakeCase<T extends ObjectType>(obj: object): T {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }
  const newObj = obj instanceof Date ? obj : Array.isArray(obj) ? [] : {} as unknown as T;
  for (const key in obj) {
    const newKey = key.replace(/([A-Z])/g, '_$1').toLowerCase() as keyof any;
    newObj[newKey as keyof typeof newObj] = objToSnakeCase(obj[key as keyof typeof obj]) as T[keyof T];
  }
  return newObj as T;
}
