import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../../prisma/prisma.service';
import { R } from '../../../../../common/R';
import { SysConfigDto, SysConfigSelListDto, SysConfigSelAllDto, SysConfigInsOneDto, SysConfigUpdOneDto } from './dto';
import { BaseContextService } from '../../../../base-context/base-context.service';

@Injectable()
export class SysConfigService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly bcs: BaseContextService,
  ) {
    this.bcs.setFieldSelectParam('sys_config', {
      notNullKeys: ['ifAllowUserRegist'],
    });
  }

  async selSysConfig(dto: SysConfigSelListDto): Promise<R> {
    const res = await this.prisma.findPage<SysConfigDto, SysConfigSelListDto>('sys_config', {
      data: dto,
      orderBy: false,
    });
    return R.ok(res);
  }

  async selAllSysConfig(dto: SysConfigSelAllDto): Promise<R> {
    const res = await this.prisma.findAll<SysConfigDto>('sys_config', {
      data: dto,
      orderBy: false,
    });
    return R.ok(res);
  }

  async selOnesSysConfig(ids: number[]): Promise<R> {
    const res = await this.prisma.findByIds<SysConfigDto>('sys_config', Object.values(ids).map(n => Number(n)));
    return R.ok(res);
  }

  async selOneSysConfig(id: number): Promise<R> {
    const res = await this.prisma.findById<SysConfigDto>('sys_config', Number(id));
    return R.ok(res);
  }

  async insSysConfig(dto: SysConfigInsOneDto): Promise<R> {
    const res = await this.prisma.create<SysConfigDto>('sys_config', dto);
    return R.ok(res);
  }

  async insSysConfigs(dtos: SysConfigInsOneDto[]): Promise<R> {
    const res = await this.prisma.createMany<SysConfigDto>('sys_config', dtos);
    return R.ok(res);
  }

  async updSysConfig(dto: SysConfigUpdOneDto): Promise<R> {
    const res = await this.prisma.updateById<SysConfigDto>('sys_config', dto);
    return R.ok(res);
  }

  async updSysConfigs(dtos: SysConfigUpdOneDto[]): Promise<R> {
    const res = await this.prisma.updateMany<SysConfigDto>('sys_config', dtos);
    return R.ok(res);
  }

  async delSysConfig(ids: number[]): Promise<R> {
    const res = await this.prisma.deleteById<SysConfigDto>('sys_config', ids);
    return R.ok(res);
  }
}
