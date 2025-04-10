import request from "@/api/request.ts";
import { LoginDto } from "@/type/module/main/sysManage/user.ts";
import { cryptUtils } from "@ms/common";

/**
 * 获取公钥
 */
export function generateLoginKey() {
  return request<{ uuid: string, publicKey: string }>({
    url: '/sys/user/generate-key',
    method: 'POST',
  })
}

/**
 * 管理员登录
 * @param data
 */
export async function loginApi(data: LoginDto) {
  const key = await generateLoginKey();
  const newPassword = await cryptUtils.rsa.encrypt(key.publicKey, data.password);
  return request({
    url: '/sys/user/adminlogin',
    method: 'POST',
    data: {
      ...data,
      password: newPassword,
      psdType: 'c',
      passwordKeyUuid: key.uuid
    }
  })
}

/**
 * 登出
 */
export function logOutApi() {
  return request({
    url: '/sys/user/log-out',
    method: 'POST',
  })
}

/**
 * 获取验证码
 */
export function getVerificationCode() {
  return request({
    url: '/sys/user/verification-code',
    method: 'GET',
  })
}
