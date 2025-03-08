import { Injectable } from '@nestjs/common';
import { RedisService } from '../../redis/redis.service';
import * as jwt from 'jsonwebtoken';
import { TokenDto } from '../../common/token';
import { serverConfig } from "@ms/config";
import { idUtils } from "@ms/common";

@Injectable()
export class CacheTokenService {
  readonly UUID_TOKEN = 'zzz:uuid:token';
  readonly VERIFICATION_CODE = 'zzz:verification:code';

  // readonly USERID_UUID = 'userid:uuid';

  constructor(
    private readonly redis: RedisService,
  ) {
  }

  /**
   * 生成token
   * @param userId
   * @param username
   * @param loginRole
   */
  async genToken(userId: string, username: string, loginRole: string) {
    const payload: TokenDto = {
      userid: userId,
      username: username,
      loginRole: loginRole,
    };
    const jwtConstants = serverConfig.currentConfig().jwtConstants;
    const token = jwt.sign(payload, jwtConstants.secret, {
      expiresIn: jwtConstants.expireTime,
    });
    const uuid = idUtils.randomUUID();
    await this.redis.setex(`${this.UUID_TOKEN}:${uuid}`, jwtConstants.expireTime, token);
    return uuid;
  }

  /**
   * 解析token
   * @param tokenUuid
   */
  async verifyToken(tokenUuid: string): Promise<TokenDto> {
    const token = await this.redis.get(`${this.UUID_TOKEN}:${tokenUuid}`);
    const decoded = jwt.verify(token, serverConfig.currentConfig().jwtConstants.secret) as TokenDto;
    // await this.freshToken(decoded, tokenUuid);
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
    await this.redis.setex(`${this.VERIFICATION_CODE}:${uuid}`, serverConfig.currentConfig().VERIFICATION_CODE_EXPIRE_TIME, code);
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
}
