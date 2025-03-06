import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../../prisma/prisma.service';
import { R } from '../../../../../common/R';
import { CodeGenColumnDto, CodeGenColumnSelListDto, CodeGenColumnSelAllDto, CodeGenColumnInsOneDto, CodeGenColumnUpdOneDto } from './dto';
import { BaseContextService } from '../../../../base-context/base-context.service';

@Injectable()
export class CodeGenColumnService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly bcs: BaseContextService,
  ) {
    this.bcs.setFieldSelectParam('sys_code_gen_column', {
      notNullKeys: ['tableId', 'colName', 'colDescr', 'mysqlType', 'tsType', 'tsName', 'ifIns', 'ifUpd', 'ifSelOne', 'ifSelMore', 'ifRequired', 'selType', 'formType', 'orderNum'],
      numberKeys: ['tableId', 'orderNum'],
    })
  }

  async selCodeGenColumn(dto: CodeGenColumnSelListDto): Promise<R> {
    const res = await this.prisma.findPage<CodeGenColumnDto, CodeGenColumnSelListDto>('sys_code_gen_column', {
      data: dto,
      orderBy: true,
    });
    return R.ok(res);
  }

  async selAllCodeGenColumn(dto: CodeGenColumnSelAllDto): Promise<R> {
    const res = await this.prisma.findAll<CodeGenColumnDto>('sys_code_gen_column', {
      data: dto,
      orderBy: true,
    });
    return R.ok(res);
  }

  async selOnesCodeGenColumn(ids: number[]): Promise<R> {
    const res = await this.prisma.findByIds<CodeGenColumnDto>('sys_code_gen_column', Object.values(ids).map(n => Number(n)));
    return R.ok(res);
  }

  async selOneCodeGenColumn(id: number): Promise<R> {
    const res = await this.prisma.findById<CodeGenColumnDto>('sys_code_gen_column', Number(id));
    return R.ok(res);
  }

  async insCodeGenColumn(dto: CodeGenColumnInsOneDto): Promise<R> {
    const res = await this.prisma.create<CodeGenColumnDto>('sys_code_gen_column', dto);
    return R.ok(res);
  }

  async insCodeGenColumns(dtos: CodeGenColumnInsOneDto[]): Promise<R> {
    const res = await this.prisma.createMany<CodeGenColumnDto>('sys_code_gen_column', dtos);
    return R.ok(res);
  }

  async updCodeGenColumn(dto: CodeGenColumnUpdOneDto): Promise<R> {
    const res = await this.prisma.updateById<CodeGenColumnDto>('sys_code_gen_column', dto);
    return R.ok(res);
  }

  async updCodeGenColumns(dtos: CodeGenColumnUpdOneDto[]): Promise<R> {
    const res = await this.prisma.updateMany<CodeGenColumnDto>('sys_code_gen_column', dtos);
    return R.ok(res);
  }

  async delCodeGenColumn(ids: number[]): Promise<R> {
    const res = await this.prisma.deleteById<CodeGenColumnDto>('sys_code_gen_column', ids);
    return R.ok(res);
  }
}
