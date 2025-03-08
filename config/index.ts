import * as adminConfig from './config/admin.config.js'
import * as serverConfig from './config/server.config.js'
import * as publicConfig from './config/public.config.js'

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
