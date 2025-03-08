import * as process from "process";
import configProd from "./public-prod.config.js";
import { ImportMeta } from "./index";

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
}

const config = {
  dev: {
    SECRET_KEY: 'awefujhjka@*&$^564', // 前端-后端接口敏感信息加密盐
  },
  prod: configProd,
}
