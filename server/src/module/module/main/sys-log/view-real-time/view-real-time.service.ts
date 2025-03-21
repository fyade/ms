import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../../prisma/prisma.service';
import { R } from '../../../../../common/R';
import { BaseContextService } from '../../../../base-context/base-context.service';
import { ViewRealTimeDirs, ViewRealTimeSelDirsDto, ViewRealTimeSelFileDto } from './dto';
import { serverConfig } from '@ms/config';
import * as fs from 'node:fs';
import * as path from 'node:path';

@Injectable()
export class ViewRealTimeService {
  private logSavePath: string = '';

  constructor(
    private readonly prisma: PrismaService,
    private readonly bcs: BaseContextService,
  ) {
    this.logSavePath = serverConfig.currentConfig().log.logSavePath;
  }

  async selDirs(dto: ViewRealTimeSelDirsDto): Promise<R> {
    const parentPath = path.join(this.logSavePath, dto.parentDir);
    const allFiles = fs.readdirSync(parentPath);
    const ret: ViewRealTimeDirs[] = [];
    allFiles.forEach((file) => {
      const s = path.join(parentPath, file);
      const stat = fs.statSync(s);
      const dirs = new ViewRealTimeDirs();
      dirs.parentPath = parentPath;
      dirs.filename = file;
      dirs.fullPath = s;
      if (stat.isFile()) {
        dirs.type = 'file';
        dirs.filesize = stat.size;
      } else if (stat.isDirectory()) {
        dirs.type = 'directory';
      }
      ret.push(dirs);
    });
    return R.ok(ret);
  }

  async selFile(dto: ViewRealTimeSelFileDto): Promise<R> {
    const text = await fs.readFileSync(path.join(this.logSavePath, dto.parentDir, dto.filename), 'utf-8');
    return R.ok(text);
  }
}
