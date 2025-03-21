import { Injectable } from '@nestjs/common';
import { R } from '../../../../../common/R';
import { RedisService } from '../../../../../redis/redis.service';
import { CacheTokenService } from '../../../../cache/cache.token.service';
import { BaseContextService } from '../../../../base-context/base-context.service';
import { OnlineUserSelListDto } from './dto';
import { PageVo } from '../../../../../common/vo/PageVo';
import { TokenDto } from '../../../../../common/token';
import { WinstonService } from '../../../../winston/winston.service';
import { idUtils } from '@ms/common';
import { serverConfig } from '@ms/config';
import { deepClone } from "../../../../../util/ObjectUtils";

@Injectable()
export class OnlineUserService {
  private UUID_TOKEN: string;
  private UUID1_UUID: string;

  constructor(
    private readonly redis: RedisService,
    private readonly cacheTokenService: CacheTokenService,
    private readonly bcs: BaseContextService,
    private readonly winston: WinstonService,
  ) {
    this.UUID_TOKEN = this.cacheTokenService.UUID_TOKEN;
    this.UUID1_UUID = this.cacheTokenService.UUID1_UUID;
  }

  async selOnlineUserList(dto: OnlineUserSelListDto): Promise<R> {
    const allKeys = await this.scanUserList(dto);
    const allKeys2 = [];
    for (const key of allKeys.keys) {
      const id = idUtils.genId();
      allKeys2.push(id);
      await this.redis.setex(`${this.UUID1_UUID}:${id}`, serverConfig.currentConfig().jwtConstants.expireTime, key);
    }
    const list = allKeys.values.map((obj, index) => ({
      ...obj,
      id: allKeys2[index],
    }));
    const pageVo = new PageVo<TokenDto>(dto.pageNum, dto.pageSize, allKeys.count, list);
    return R.ok(pageVo);
  }

  async delOnlineUser(ids: string[]): Promise<R> {
    const keys = await this.redis.mget(...ids.map((id) => `${this.UUID1_UUID}:${id}`));
    await this.redis.del(...keys.map((key) => `${this.UUID_TOKEN}:${key}`));
    return R.ok(true);
  }

  private async scanUserList(param: OnlineUserSelListDto) {
    const dto = deepClone(param);
    const pageNum = Number(dto.pageNum);
    const pageSize = Number(dto.pageSize);
    delete dto.pageNum;
    delete dto.pageSize;
    const keys: string[] = [];
    const values: TokenDto[] = [];
    let count = 0;
    let cursor = 0;
    let ifStop = false;
    do {
      const [newCursor, foundKeys_] = await this.redis
        .getRedis()
        .scan(cursor, 'MATCH', `${this.UUID_TOKEN}:*`, 'COUNT', pageSize);
      const foundKeys = [];
      const foundValues__ = await this.redis.mget(...foundKeys_);
      const foundValues_ = foundValues__.map((item) => JSON.parse(item) as TokenDto);
      const foundValues = [];
      for (let i = 0; i < foundKeys_.length; i++) {
        const fkey = foundKeys_[i];
        const fvalue = foundValues_[i];
        if (!Object.values(dto).some((_) => _)) {
          foundKeys.push(fkey);
          foundValues.push(fvalue);
          continue;
        }
        if (Object.keys(dto).every((key) => fvalue[key].includes(dto[key]))) {
          foundKeys.push(fkey);
          foundValues.push(fvalue);
        }
      }
      const oldCount = count;
      const newCount = count + foundKeys.length;
      if (oldCount <= (pageNum - 1) * pageSize && newCount > (pageNum - 1) * pageSize) {
        keys.push(...foundKeys.slice(foundKeys.length - (newCount - (pageNum - 1) * pageSize)));
        values.push(...foundValues.slice(foundValues.length - (newCount - (pageNum - 1) * pageSize)));
      } else if (oldCount > (pageNum - 1) * pageSize && newCount <= pageNum * pageSize) {
        keys.push(...foundKeys);
        values.push(...foundValues);
      } else if (oldCount <= pageNum * pageSize && newCount > pageNum * pageSize) {
        keys.push(...foundKeys.slice(0, pageNum * pageSize - oldCount));
        values.push(...foundValues.slice(0, pageNum * pageSize - oldCount));
      } else if (oldCount <= (pageNum - 1) * pageSize && newCount > pageNum * pageSize) {
        keys.push(...foundKeys.slice((pageNum - 1) * pageSize - oldCount, pageNum * pageSize - oldCount));
        values.push(...foundValues.slice((pageNum - 1) * pageSize - oldCount, pageNum * pageSize - oldCount));
      }
      count = newCount;
      if (newCursor === '0') {
        ifStop = true;
      } else {
        cursor = parseInt(newCursor);
      }
    } while (!ifStop);
    return {
      keys: keys.map((str) => str.replace(`${this.UUID_TOKEN}:`, '')),
      count,
      values: values,
    };
  }
}
