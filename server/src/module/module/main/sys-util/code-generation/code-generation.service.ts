import { Injectable } from '@nestjs/common';
import { R } from '../../../../../common/R';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { NonSupportException } from '../../../../../exception/non-support.exception';
import { PrismaService } from '../../../../../prisma/prisma.service';
import { codeGeneration } from './codeGeneration';
import { CodeGenTableDto } from '../code-gen-table/dto';
import { CodeGenColumnDto } from '../code-gen-column/dto';
import { CgTablesInterface } from './dto';
import { SysDto } from '../../sys-manage/sys/dto';
import { getAllFiles } from '../../../../../util/FileUtils';

@Injectable()
export class CodeGenerationService {
  constructor(private readonly prisma: PrismaService) {
  }

  async getDatabaseInfo(): Promise<R> {
    let text = '';
    try {
      const pathJoin = path.join(__dirname, '../../../../../../../../');
      const prismaPath = path.join(pathJoin.endsWith('dist\\') ? pathJoin.substring(0, pathJoin.length - 5) : pathJoin, 'prisma');
      const files = await getAllFiles(prismaPath);
      const prismaFiles = files.filter((item) => item.endsWith('.prisma'));
      for (const file of prismaFiles) {
        text = text + '\n' + fs.readFileSync(file, 'utf-8');
      }
    } catch (e) {
      throw new NonSupportException('读取数据库信息');
    }
    const regex1 = /\/\/ .+/;
    const regex2 = /^model (\w+) {/;
    const regex3 = /^ *([\w-]+) +([\w-?]+) +([\w-@(). "']+) */;
    const lines = text.split('\n');
    const tables: CgTablesInterface[] = [];
    for (let i = 0; i < lines.length - 1; i++) {
      if (regex1.test(lines[i]) && regex2.test(lines[i + 1])) {
        tables.push({
          rowIndex: i,
          tableNameCnInitial: lines[i],
          tableNameEnInitial: lines[i + 1],
          tableNameCn: lines[i].replace(/\/+ +/, ''),
          tableNameEn: lines[i + 1].replace(/^model +/, '').replace(/ +{/, '').match(/([a-zA-Z_]+)/g)[0],
          cols: [],
        });
      }
    }
    for (let i = 0; i < tables.length; i++) {
      const is: number = tables[i].rowIndex + 2;
      const ie: number = i === tables.length - 1 ? lines.length - 1 : tables[i + 1].rowIndex - 2;
      let is1: number = is;
      let ie1: number = ie;
      while (!regex3.test(lines[is1])) {
        is1++;
      }
      while (!regex3.test(lines[ie1])) {
        ie1--;
      }
      for (let j = is1; j <= ie1; j++) {
        tables[i].cols.push({
          colInfo: lines[j],
          colName: lines[j].replace(regex3, '$1').match(/([a-zA-Z_]+)/g)[0],
          colType: lines[j].replace(regex3, '$2').replace('?', ''),
          ifMust: !lines[j].replace(regex3, '$2').endsWith('?'),
          colRemark: lines[j].replace(regex3, '$3'),
        });
      }
    }
    return R.ok(tables);
  }

  async genCode(id: number): Promise<R> {
    const table = await this.prisma.findById<CodeGenTableDto>('sys_code_gen_table', Number(id));
    const columns = await this.prisma.findAll<CodeGenColumnDto>('sys_code_gen_column', {
      data: { tableId: Number(id) },
      orderBy: true,
    });
    const sys = await this.prisma.findById<SysDto>('sys_sys', table.sysId);
    const cgRes = codeGeneration({ table, columns, sys });
    return R.ok({
      table,
      columns,
      cgRes,
    });
  }

  async genCodeZip(id: number): Promise<R> {
    return R.ok('codeZip');
  }
}
