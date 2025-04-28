import { Injectable } from '@nestjs/common';
import { R } from './common/R';
import { NonSupportException } from './exception/non-support.exception';
import { AuthService } from './module/auth/auth.service';
import { getAllFiles } from './util/FileUtils';
import { MenuTypeEnum } from './util/base';
import { BaseContextService } from './module/base-context/base-context.service';
import { CacheTokenService } from './module/cache/cache.token.service';
import { PrismaoService } from "./prisma/prismao.service";
import { serverConfig } from "@ms/config";
import * as fs from 'node:fs';
import * as path from 'node:path';

const si = require("systeminformation");

@Injectable()
export class AppService {
  private cpuUsageMSDefault: number;

  constructor(
    private readonly authService: AuthService,
    private readonly bcs: BaseContextService,
    private readonly cacheTokenService: CacheTokenService,
    private readonly prismao: PrismaoService,
  ) {
    this.cpuUsageMSDefault = 100; // CPU 利用率默认时间段
  }

  async getHello(): Promise<R> {
    return R.ok('Hello World!');
  }

  async getVersion(): Promise<R> {
    return R.ok(serverConfig.currentVersion);
  }

  async getTime(): Promise<R> {
    return R.ok(new Date());
  }

  async getSystemUsingInfo(): Promise<R> {
    const ress = await Promise.allSettled([
      this.getCPUUsage(),
      this.getMemoryInfo(),
      this.getDiskInfo()
    ])
    return R.ok({
      cpu: ress[0].status === 'fulfilled' ? ress[0].value : null,
      memory: ress[1].status === 'fulfilled' ? ress[1].value : null,
      disk: ress[2].status === 'fulfilled' ? ress[2].value : null,
    })
  }

  async getAllAuthApis(): Promise<R<Record<string, {
    authApiStrs: string[],
    authApiObjs: { permission: string, label: string }[]
  }>>> {
    const allAuthApis = {};
    try {
      const directoryPath = path.join(__dirname, '../../src/module');
      const files = await getAllFiles(directoryPath);
      files.push(path.join(__dirname, '../../src/app.controller.ts'));
      const filePaths = files.filter(fileName => fileName.endsWith('.controller.ts'));
      for (const filePath of filePaths) {
        const text = await fs.readFileSync(filePath, 'utf-8');
        // 正则表达式来匹配单引号或双引号内的字符串
        const simpleAuthorizeRegex = /@Authorize\('([^']*)'\)/g;
        const complexAuthorizeRegex = /@Authorize\(\s*{[^}]*}\s*\)/g;
        // 提取简单授权字符串
        const simpleAuthorizeMatches = text.match(simpleAuthorizeRegex);
        const simpleAuthorizePermissions = simpleAuthorizeMatches?.map(match => {
          const regex = /'([^']*)'/;
          const permissionMatch = match.match(regex);
          return permissionMatch ? permissionMatch[1] : null;
        }) || [];
        // 提取复杂授权对象字符串
        const complexAuthorizeMatches = text.match(complexAuthorizeRegex);
        const complexAuthorizeObjects = complexAuthorizeMatches;

        function parseAuthorizeObject(str) {
          // 移除@Authorize和括号
          const content = str.replace('@Authorize(', '').replace(/\s*\)\s*$/, '');
          // 将字符串转换为对象
          try {
            return Function('"use strict";return (' + content + ');')();
          } catch (e) {
            return null;
          }
        }

        const authorizeObject = complexAuthorizeObjects ? complexAuthorizeObjects.map(complexAuthorizeObject => parseAuthorizeObject(complexAuthorizeObject)).filter(item => item) : [];
        allAuthApis[filePath] = {
          authApiStrs: simpleAuthorizePermissions,
          authApiObjs: authorizeObject,
        };
      }
    } catch (e) {
      console.error(e);
      throw new NonSupportException('读取源代码信息');
    }
    return R.ok(allAuthApis);
  }

  async getAllAuthApis2(): Promise<R> {
    const hdData = await this.getAllAuthApis();
    const dbData = await this.prismao.getOrigin().sys_menu.findMany({
      where: {
        ...this.prismao.defaultSelArg().where,
      }
    })
    const dbPerms = dbData.filter(item => item.type === 'mb').map(item => [item.label, item.perms]);
    const hdPerms = Object.values(hdData.data).map(item => item.authApiObjs).flat().map(item => [item.label, item.permission])
    const dbPerms1 = dbPerms.map(_ => _[1]);
    const hdPerms1 = hdPerms.map(_ => _[1]);
    // 后端有数据库没有的
    const permsNotInDb = hdPerms1.filter(item => !dbPerms1.includes(item)).filter(item => item !== '-')
    // 数据库有后端没有的
    const permsNotInHd = dbPerms1.filter(item => !hdPerms1.includes(item))
    // label不一样的
    const labelDiffs = [
      ...dbPerms.filter(item => {
        const find1 = dbPerms.find(itm => itm[1] === item[1])
        const find2 = hdPerms.find(itm => itm[1] === item[1])
        return find1 && find2 && find1[0] !== find2[0]
      }),
      ...hdPerms.filter(item => {
        const find1 = dbPerms.find(itm => itm[1] === item[1])
        const find2 = hdPerms.find(itm => itm[1] === item[1])
        return find1 && find2 && find1[0] !== find2[0]
      })
    ]
    return R.ok({
      permsNotInDb,
      permsNotInHd,
      labelDiffs,
      label: {
        permsNotInDb: '后端有数据库没有的',
        permsNotInHd: '数据库有后端没有的',
        labelDiffs: 'label不一样的',
      }
    });
  }

  async getSystems(): Promise<R> {
    const systemsOfUser = await this.authService.systemsOfUser(
      this.bcs.getUserData().userId,
      this.bcs.getUserData().loginRole,
    );
    return R.ok(systemsOfUser);
  }

  async getPages(sysId: number): Promise<R> {
    const permissionsOfUser = await this.authService.permissionsOfUser({
      userId: this.bcs.getUserData().userId,
      loginRole: this.bcs.getUserData().loginRole,
      sysId,
      menuType: [MenuTypeEnum.T_MENU, MenuTypeEnum.T_COMP],
    });
    return R.ok(permissionsOfUser);
  }

  async getButtons(sysId: number): Promise<R> {
    const buttonsOfUser = await this.authService.permissionsOfUser({
      userId: this.bcs.getUserData().userId,
      loginRole: this.bcs.getUserData().loginRole,
      sysId,
      menuType: [MenuTypeEnum.T_Inter],
    });
    return R.ok(buttonsOfUser);
  }

  /**
   * 获取CPU信息
   */
  private async getCPUUsage() {
    return new Promise(resolve => {
      // si.cpu().then(data => resolve(data));
      resolve(null)
    })
  }

  /**
   * 获取内存信息
   */
  private async getMemoryInfo() {
    return new Promise(resolve => {
      si.mem().then(res => resolve({
        total: res.total,
        free: res.free,
        used: res.used,
      }))
    })
  }

  /**
   * 获取磁盘信息
   */
  private getDiskInfo() {
    return new Promise((resolve) => {
      si.fsSize().then(res => {
        resolve(res.map(item => ({
          mount: item.mount,
          size: item.size,
          used: item.used,
          available: item.available,
        })))
      })
    });
  }
}
