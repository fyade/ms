/**
 * 获取类型
 * @param param
 */
export const typeOf = (param: any) => {
  if (typeof param === 'object') {
    return Object.prototype.toString.call(param).slice(8, -1).toLowerCase() as string;
  } else {
    return typeof param;
  }
};

/**
 * sleep
 * @param ms
 */
export function sleep(ms = 1000) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * 转换为path
 * @param str
 */
export function toPath(...str: string[]): string {
  return str.join('/').replace(/\/+/g, '/');
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
export function toCamelCase(str: string): string {
  return str.replace(/[-_]([a-z])/g, (all, i) => i.toUpperCase());
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
export function objToCamelCase<T extends ObjectType>(obj): T {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }
  const newObj = obj instanceof Date ? obj : Array.isArray(obj) ? [] : {} as any;
  for (const key in obj) {
    const newKey = key.replace(/_([a-z])/g, (match, char) => char.toUpperCase()) as keyof any;
    newObj[newKey] = objToCamelCase(obj[key]);
  }
  return newObj as T;
}

/**
 * 对象的key驼峰命名转下划线命名
 * @param obj
 */
export function objToSnakeCase<T extends ObjectType>(obj: T): T {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }
  const newObj = obj instanceof Date ? obj : Array.isArray(obj) ? [] : {} as unknown as T;
  for (const key in obj) {
    const newKey = key.replace(/([A-Z])/g, '_$1').toLowerCase() as keyof any;
    newObj[newKey] = objToSnakeCase(obj[key]) as T[keyof T];
  }
  return newObj as T;
}
