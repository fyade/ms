import * as process from "process";
import configProd from "./admin-prod.config.js";
import { ImportMeta } from './index.js'

export const APP_NAME = '知笙后台管理系统'
export const currentVersion = '0.1.01.1'

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

const config = {
  dev: {
    VITE_MODE: 'dev',
    VITE_BASEURL: 'http://localhost:8060',
    VITE_BASEURL_SOCKET: 'ws://localhost:8061',
    VITE_FILE_BASEURL: 'http://localhost:8060/static/file/',
    VITE_API_PREFIX: '/api-dev',
    VITE_API_FILE_PREFIX: '/api-file-dev',
    CHUNK_SIZE: 1024 * 1024 * 2, // 允许上传的文件的最大体积，单位为 B
  },
  prod: configProd,
}
