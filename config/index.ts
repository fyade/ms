import * as adminConfig from './admin.config.js'
import * as serverConfig from './server.config.js'
import * as publicConfig from './public.config.js'

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
