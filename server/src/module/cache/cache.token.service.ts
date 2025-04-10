import { Injectable } from '@nestjs/common';
import { RedisService } from '../../redis/redis.service';
import { TokenDto } from '../../common/token';
import { serverConfig } from '@ms/config';
import { idUtils } from '@ms/common';

const currentConfig = serverConfig.currentConfig();

@Injectable()
export class CacheTokenService {
  readonly UUID_TOKEN = 'zzz:uuid:token';
  readonly UUID1_UUID = 'zzz:uuid1:uuid';
  readonly VERIFICATION_CODE = 'zzz:verification:code';
  readonly PASSWORD_KEY = 'zzz:password:key';

  constructor(private readonly redis: RedisService) {}

  /**
   * 生成token
   * @param userId
   * @param username
   * @param loginRole
   * @param loginIp
   * @param loginOs
   * @param loginBrowser
   */
  async genToken(
    userId: string,
    username: string,
    loginRole: string,
    loginIp: string,
    loginOs: string,
    loginBrowser: string,
  ) {
    const payload: TokenDto = {
      userid: userId,
      username: username,
      loginRole: loginRole,
      loginTime: new Date(),
      loginIp: loginIp,
      loginBrowser: loginBrowser,
      loginOs: loginOs,
    };
    const jwtConstants = currentConfig.jwtConstants;
    const uuid = idUtils.randomUUID();
    await this.redis.setex(`${this.UUID_TOKEN}:${uuid}`, jwtConstants.expireTime, JSON.stringify(payload));
    return uuid;
  }

  /**
   * 解析token
   * @param tokenUuid
   */
  async verifyToken(tokenUuid: string): Promise<TokenDto> {
    const payloadString = await this.redis.get(`${this.UUID_TOKEN}:${tokenUuid}`);
    const decoded = JSON.parse(payloadString) as TokenDto;
    return decoded;
  }

  /**
   * 删除token
   * @param tokenUuid
   */
  async deleteToken(tokenUuid: string) {
    await this.redis.del(`${this.UUID_TOKEN}:${tokenUuid}`);
  }

  /**
   * 保存验证码内容
   * @param uuid
   * @param code
   */
  async saveVerificationCode(uuid: string, code: string) {
    await this.redis.setex(`${this.VERIFICATION_CODE}:${uuid}`, currentConfig.VERIFICATION_CODE_EXPIRE_TIME, code);
  }

  /**
   * 获取验证码内容
   * @param uuid
   */
  async getVerificationCode(uuid: string) {
    return await this.redis.get(`${this.VERIFICATION_CODE}:${uuid}`);
  }

  /**
   * 删除验证码内容
   * @param uuid
   */
  async deleteVerificationCode(uuid: string) {
    await this.redis.del(`${this.VERIFICATION_CODE}:${uuid}`);
  }

  /**
   * 保存密码公钥私钥
   * @param uuid
   * @param key
   */
  async savePasswordKey(uuid: string, key: { publicKey: string; privateKey: string }) {
    await this.redis.setex(
      `${this.PASSWORD_KEY}:${uuid}`,
      currentConfig.VERIFICATION_CODE_EXPIRE_TIME,
      JSON.stringify(key),
    );
  }

  /**
   * 获取密码公钥私钥
   * @param uuid
   */
  async getPasswordKey(uuid: string) {
    const s = await this.redis.get(`${this.PASSWORD_KEY}:${uuid}`);
    return JSON.parse(s) as { publicKey: string; privateKey: string };
  }

  /**
   * 删除密码公钥私钥
   * @param uuid
   */
  async deletePasswordKey(uuid: string) {
    await this.redis.del(`${this.PASSWORD_KEY}:${uuid}`);
  }
}
