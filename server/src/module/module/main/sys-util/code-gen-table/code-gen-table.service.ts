import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../../prisma/prisma.service';
import { R } from '../../../../../common/R';
import { CodeGenTableDto, CodeGenTableSelListDto, CodeGenTableSelAllDto, CodeGenTableInsOneDto, CodeGenTableUpdOneDto } from './dto';
import { BaseContextService } from '../../../../base-context/base-context.service';

@Injectable()
export class CodeGenTableService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly bcs: BaseContextService,
  ) {
    this.bcs.setFieldSelectParam('sys_code_gen_table', {
      notNullKeys: ['tableName', 'tableDescr', 'entityName', 'businessName', 'moduleName', 'businessNameCn', 'moduleNameCn', 'sysId', 'orderNum'],
      numberKeys: ['sysId', 'orderNum'],
    })
  }

  async selCodeGenTable(dto: CodeGenTableSelListDto): Promise<R> {
    const res = await this.prisma.findPage<CodeGenTableDto, CodeGenTableSelListDto>('sys_code_gen_table', {
      data: dto,
      orderBy: true,
    });
    return R.ok(res);
  }

  async selAllCodeGenTable(dto: CodeGenTableSelAllDto): Promise<R> {
    const res = await this.prisma.findAll<CodeGenTableDto>('sys_code_gen_table', {
      data: dto,
      orderBy: true,
    });
    return R.ok(res);
  }

  async selOnesCodeGenTable(ids: number[]): Promise<R> {
    const res = await this.prisma.findByIds<CodeGenTableDto>('sys_code_gen_table', Object.values(ids).map(n => Number(n)));
    return R.ok(res);
  }

  async selOneCodeGenTable(id: number): Promise<R> {
    const res = await this.prisma.findById<CodeGenTableDto>('sys_code_gen_table', Number(id));
    return R.ok(res);
  }

  async insCodeGenTable(dto: CodeGenTableInsOneDto): Promise<R> {
    const res = await this.prisma.create<CodeGenTableDto>('sys_code_gen_table', dto);
    return R.ok(res);
  }

  async insCodeGenTables(dtos: CodeGenTableInsOneDto[]): Promise<R> {
    const res = await this.prisma.createMany<CodeGenTableDto>('sys_code_gen_table', dtos);
    return R.ok(res);
  }

  async updCodeGenTable(dto: CodeGenTableUpdOneDto): Promise<R> {
    const res = await this.prisma.updateById<CodeGenTableDto>('sys_code_gen_table', dto);
    return R.ok(res);
  }

  async updCodeGenTables(dtos: CodeGenTableUpdOneDto[]): Promise<R> {
    const res = await this.prisma.updateMany<CodeGenTableDto>('sys_code_gen_table', dtos);
    return R.ok(res);
  }

  async delCodeGenTable(ids: number[]): Promise<R> {
    const res = await this.prisma.deleteById<CodeGenTableDto>('sys_code_gen_table', ids);
    return R.ok(res);
  }
}
