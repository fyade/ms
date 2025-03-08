import * as process from "process";
import configProd from "./server-prod.config.js";
import { ImportMeta } from "./index";

export const currentVersion = '0.0.20.9';

export const currentConfig = (): typeof config.dev => {
  let environmentMode;
  if (typeof import.meta !== 'undefined' && (import.meta as unknown as ImportMeta).env) {
    environmentMode = (import.meta as unknown as ImportMeta).env.MODE;
  } else if (typeof process !== 'undefined' && process.env) {
    environmentMode = process.env.NODE_ENV;
  } else {
    environmentMode = 'dev';
  }
  if (!environmentMode || !Object.keys(config).includes(environmentMode)) {
    throw new Error(`当前环境（${environmentMode}）无配置。`);
  }
  return config[environmentMode as keyof typeof config];
};

const mysqlConnectParam = 'autoReconnect=true&useSSL=false&characterEncoding=utf-8&zeroDateTimeBehavior=convertToNull&dateStrings=true&serverTimezone=Asia/Shanghai';
const config = {
  dev: {
    mode: 'dev',
    port: 8060,
    wsPort: 8061,
    staticRoot: '/static/file', // 静态资源转发 url 前缀
    redis: {
      host: 'localhost',
      port: 6379,
      password: '123456',
      database: 12,
      databaseForQueue: 22,
    },
    database: {
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'proj_manage-system',
      timezone: 'Asia/Shanghai',
    },
    file: {
      uploadPath: 'D:\\DevelopmentTools\\nestProjFilePath\\manage-system\\', // 文件存放位置
      maxSizeOfFull: 1024 * 1024 * 10, // 允许上传的文件的最大体积，单位为 B
    },
    log: {
      logSavePath: 'D:\\DevelopmentTools\\nestProjLogPath\\manage-system\\', // 日志文件位置
      maxSizeOfKogFile: 1024 * 1024, // 日志文件最大体积，单位为 B
    },
    ifShowSwagger: true, // 是否开启 swagger 文档
    ifIgnoreVerificationCode: true, // 是否不校验登录验证码
    ifLogSQLExecutionTime: true, // 是否打印 sql 执行耗时
    prismaLogLevel: ['query', 'info', 'warn', 'error'], // prisma 日志等级
    jwtConstants: {
      secret: 'AKLJFbnskjbnf@wse521', // token 盐
      expireTime: 60 * 60 * 24, // token 过期时间，单位为秒
    },
    VERIFICATION_CODE_EXPIRE_TIME: 60 * 10, // 登录验证码过期时间，单位为秒
    SECRET_KEY_HD_DB: 'safg1ws235gf1sw32g', // 后端-数据库敏感信息加密盐
    SECRET_CON_PROJ_AUTH: 'wefw35f4465wef46', // 后端主项目-后端子项目请求信息加密盐
  },
  prod: configProd,
};

export function getMysqlUrlFromEnv(env: any): string {
  return `mysql://${env.database.username}:${env.database.password}@${env.database.host}:${env.database.port}/${env.database.database}`;
}
