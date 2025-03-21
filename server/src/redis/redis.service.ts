import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { serverConfig } from "@ms/config";

const env = serverConfig.currentConfig();

@Injectable()
export class RedisService {
  private readonly redis: Redis;

  constructor() {
    this.redis = new Redis({
      host: env.redis.host,
      port: env.redis.port,
      password: env.redis.password,
      db: env.redis.database,
    });
  }

  getRedis(): Redis {
    return this.redis;
  }

  // 字符串操作

  async set(key: string, value: string): Promise<void> {
    await this.redis.set(key, value);
  }

  async get(key: string): Promise<string | null> {
    return await this.redis.get(key);
  }

  async del(...keys: string[]): Promise<number> {
    return await this.redis.del(...keys);
  }

  async mget(...keys: string[]): Promise<(string | null)[]> {
    if (keys.length === 0) {
      return [];
    }
    return this.redis.mget(...keys);
  }

  async incr(key: string): Promise<number> {
    return await this.redis.incr(key);
  }

  async decr(key: string): Promise<number> {
    return await this.redis.decr(key);
  }

  async setex(key: string, seconds: number, value: string): Promise<void> {
    await this.redis.setex(key, seconds, value);
  }

  // 集合操作

  async sadd(key: string, ...members: string[]): Promise<number> {
    return await this.redis.sadd(key, ...members);
  }

  async smembers(key: string): Promise<string[]> {
    return await this.redis.smembers(key);
  }

  async srem(key: string, ...members: string[]): Promise<number> {
    return await this.redis.srem(key, ...members);
  }

  async sismember(key: string, member: string): Promise<number> {
    return await this.redis.sismember(key, member);
  }

  async scard(key: string): Promise<number> {
    return await this.redis.scard(key);
  }

  // 哈希操作

  async hset(key: string, field: string, value: string): Promise<number> {
    return await this.redis.hset(key, field, value);
  }

  async hget(key: string, field: string): Promise<string | null> {
    return await this.redis.hget(key, field);
  }

  async hgetall(key: string): Promise<{ [field: string]: string }> {
    return await this.redis.hgetall(key);
  }

  async hdel(key: string, ...fields: string[]): Promise<number> {
    return await this.redis.hdel(key, ...fields);
  }

  async hkeys(key: string): Promise<string[]> {
    return await this.redis.hkeys(key);
  }

  async hvals(key: string): Promise<string[]> {
    return await this.redis.hvals(key);
  }

  async hlen(key: string): Promise<number> {
    return await this.redis.hlen(key);
  }

  async hscan(hashKey: string, cursor: number, pageSize: number): Promise<{
    nextCursor: string;
    entries: { [key: string]: string }
  }> {
    const result = await this.redis.hscan(hashKey, cursor, 'COUNT', pageSize);
    const nextCursor = result[0]; // 下一个游标
    const entries = result[1]; // 当前页的键值对数组
    // 将键值对数组转换为对象
    const entriesObject: { [key: string]: string } = {};
    for (let i = 0; i < entries.length; i += 2) {
      const key = entries[i];
      const value = entries[i + 1];
      entriesObject[key] = value;
    }
    return { nextCursor, entries: entriesObject };
  }
}
