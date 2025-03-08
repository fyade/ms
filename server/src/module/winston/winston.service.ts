import { Injectable, LoggerService } from "@nestjs/common";
import * as winston from "winston";
import "winston-daily-rotate-file";
import { serverConfig } from "@ms/config";
import { timeUtils } from "@ms/common";

@Injectable()
export class WinstonService implements LoggerService {
  private logger: winston.Logger

  constructor() {
    const env = serverConfig.currentConfig();
    const errorTransport = new winston.transports.DailyRotateFile({
      level: 'error',
      dirname: env.log.logSavePath + '/errors/',
      filename: '%DATE%.error.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: env.log.maxSizeOfKogFile,
      format: winston.format.combine(
        winston.format.printf(info => {
          return `${timeUtils.formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss')} [${info.level.padEnd(15)}]: ${info.message}`
        })
      ),
    });
    const infoTransport = new winston.transports.DailyRotateFile({
      level: 'info',
      dirname: env.log.logSavePath + '/infos/',
      filename: '%DATE%.info.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: env.log.maxSizeOfKogFile,
      format: winston.format.combine(
        winston.format.printf(info => {
          return `${timeUtils.formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss')} [${info.level.padEnd(15)}]: ${info.message}`
        })
      ),
    });
    this.logger = winston.createLogger({
      levels: winston.config.syslog.levels,
      transports: [
        errorTransport,
        infoTransport,
      ],
      exceptionHandlers: [
        errorTransport,
      ],
      rejectionHandlers: [
        errorTransport,
      ],
      exitOnError: false,
    })
  }

  log(message: any, ...optionalParams: any[]) {
    this.logger.info(message, ...optionalParams);
  }

  error(message: any, ...optionalParams: any[]) {
    this.logger.error(message, ...optionalParams);
  }

  warn(message: any, ...optionalParams: any[]) {
    this.logger.warn(message, ...optionalParams);
  }

  debug?(message: any, ...optionalParams: any[]) {
    this.logger.debug(message, ...optionalParams);
  }

  verbose?(message: any, ...optionalParams: any[]) {
    this.logger.verbose(message, ...optionalParams);
  }
}
