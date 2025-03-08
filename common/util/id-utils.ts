import { v4 as uuidv4 } from 'uuid';

/**
 * 生成uuid
 */
export function randomUUID(): string {
  return uuidv4();
}

const strArr = 'abcdefghijklmnopqrstuvwxyz0123456789'.split('');

/**
 * 生成id
 * @param length
 * @param suffix
 */
export function genId(length = 16, suffix = true): string {
  const randomStr = Array.from({ length }, () => strArr[Math.floor(Math.random() * strArr.length)]).join('')
  return suffix ? `${randomStr}_${Date.now()}` : randomStr;
}
