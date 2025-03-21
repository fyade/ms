import * as adminConfig from './config/admin.config.js'
import * as serverConfig from './config/server.config.js'
import * as publicConfig from './config/public.config.js'
import * as process from "process";

export function getCurrentConfig<T extends object>(config: T) {
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
}

export interface ImportMeta {
  env: {
    MODE: string;
  };
}

export {
  adminConfig,
  serverConfig,
  publicConfig,
}
