import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../../prisma/prisma.service';
import { R } from '../../../../../common/R';
import { SysDto, SysSelListDto, SysSelAllDto, SysInsOneDto, SysUpdOneDto } from './dto';
import { BaseContextService } from '../../../../base-context/base-context.service';

@Injectable()
export class SysService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly bcs: BaseContextService,
  ) {
    this.bcs.setFieldSelectParam('sys_sys', {
      notNullKeys: ['name', 'perms', 'orderNum', 'path', 'ifDisabled'],
      numberKeys: ['orderNum'],
    })
  }

  async selSys(dto: SysSelListDto): Promise<R> {
    const res = await this.prisma.findPage<SysDto, SysSelListDto>('sys_sys', {
      data: dto,
      orderBy: true,
    });
    return R.ok(res);
  }

  async selAllSys(dto: SysSelAllDto): Promise<R> {
    const res = await this.prisma.findAll<SysDto>('sys_sys', {
      data: dto,
      orderBy: true,
    });
    return R.ok(res);
  }

  async selOnesSys(ids: number[]): Promise<R> {
    const res = await this.prisma.findByIds<SysDto>('sys_sys', Object.values(ids).map(n => Number(n)));
    return R.ok(res);
  }

  async selOneSys(id: number): Promise<R> {
    const res = await this.prisma.findById<SysDto>('sys_sys', Number(id));
    return R.ok(res);
  }

  async insSys(dto: SysInsOneDto): Promise<R> {
    const res = await this.prisma.create<SysDto>('sys_sys', dto);
    return R.ok(res);
  }

  async insSyss(dtos: SysInsOneDto[]): Promise<R> {
    const res = await this.prisma.createMany<SysDto>('sys_sys', dtos);
    return R.ok(res);
  }

  async updSys(dto: SysUpdOneDto): Promise<R> {
    const res = await this.prisma.updateById<SysDto>('sys_sys', dto);
    return R.ok(res);
  }

  async updSyss(dtos: SysUpdOneDto[]): Promise<R> {
    const res = await this.prisma.updateMany<SysDto>('sys_sys', dtos);
    return R.ok(res);
  }

  async delSys(ids: number[]): Promise<R> {
    const res = await this.prisma.deleteById<SysDto>('sys_sys', ids);
    return R.ok(res);
  }
}
