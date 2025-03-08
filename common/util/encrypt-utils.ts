import { publicConfig } from '@ms/config'
import * as crypto_ from 'crypto-js'
import * as bcrypt from 'bcryptjs'

const crypto = (crypto_ as unknown as { default: typeof crypto_ }).default || crypto_

/**
 * 双向加密的加密
 * @param str
 * @returns
 */
export function encrypt(str: string): string {
  return crypto.AES.encrypt(str, publicConfig.currentConfig().SECRET_KEY).toString()
}

/**
 * 双向加密的解密
 * @param encryptedStr
 * @returns
 */
export function decrypt(encryptedStr: string): string {
  const bytes = crypto.AES.decrypt(encryptedStr, publicConfig.currentConfig().SECRET_KEY);
  return bytes.toString(crypto.enc.Utf8);
}

/**
 * 单向加密
 * @param password
 * @returns
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt();
  return await bcrypt.hash(password, salt);
}

/**
 * 单向加密的校验
 * @param password
 * @param hashedPassword
 * @returns
 */
export async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}
