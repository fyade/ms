import { SECRET_KEY } from '../../config/config';

const bcrypt = require('bcryptjs');
const CryptoJS = require('crypto-js');

/**
 * 单向加密
 * @param password 
 * @returns 
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt();
  const newPsd = await bcrypt.hash(password, salt);
  return newPsd;
}

/**
 * 单向加密的校验
 * @param password 
 * @param hashedPassword 
 * @returns 
 */
export async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
  const boole = await bcrypt.compare(password, hashedPassword);
  return boole;
}

/**
 * 双向加密的加密
 * @param str 
 * @returns 
 */
export function encrypt(str: string): string {
  const encrypted = CryptoJS.AES.encrypt(str, SECRET_KEY).toString()
  return encrypted
}

/**
 * 双向加密的解密
 * @param encryptedStr 
 * @returns 
 */
export function decrypt(encryptedStr: string): string {
  const bytes = CryptoJS.AES.decrypt(encryptedStr, SECRET_KEY);
  const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
  return originalPassword;
}
