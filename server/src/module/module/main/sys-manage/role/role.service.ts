import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../../prisma/prisma.service';
import { R } from '../../../../../common/R';
import { RoleDto, RoleSelListDto, RoleSelAllDto, RoleInsOneDto, RoleUpdOneDto } from './dto';
import { CachePermissionService } from '../../../../cache/cache.permission.service';
import { BaseContextService } from '../../../../base-context/base-context.service';

@Injectable()
export class RoleService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly bcs: BaseContextService,
    private readonly cachePermissionService: CachePermissionService,
  ) {
    this.bcs.setFieldSelectParam('sys_role', {
      notNullKeys: ['label', 'ifAdmin', 'ifDisabled', 'orderNum'],
      numberKeys: ['orderNum'],
    })
  }

  async selRole(dto: RoleSelListDto): Promise<R> {
    const res = await this.prisma.findPage<RoleDto, RoleSelListDto>('sys_role', {
      data: dto,
      orderBy: true,
    });
    return R.ok(res);
  }

  async selAllRole(dto: RoleSelAllDto): Promise<R> {
    const res = await this.prisma.findAll<RoleDto>('sys_role', {
      data: dto,
      orderBy: true,
    });
    return R.ok(res);
  }

  async selOnesRole(ids: number[]): Promise<R> {
    const res = await this.prisma.findByIds<RoleDto>('sys_role', Object.values(ids).map(n => Number(n)));
    return R.ok(res);
  }

  async selOneRole(id: number): Promise<R> {
    const res = await this.prisma.findById<RoleDto>('sys_role', Number(id));
    return R.ok(res);
  }

  async insRole(dto: RoleInsOneDto): Promise<R> {
    const res = await this.prisma.create<RoleDto>('sys_role', dto);
    return R.ok(res);
  }

  async insRoles(dtos: RoleInsOneDto[]): Promise<R> {
    const res = await this.prisma.createMany<RoleDto>('sys_role', dtos);
    return R.ok(res);
  }

  async updRole(dto: RoleUpdOneDto): Promise<R> {
    const res = await this.prisma.updateById<RoleDto>('sys_role', dto);
    await this.cachePermissionService.clearPermissionsInCache();
    return R.ok(res);
  }

  async updRoles(dtos: RoleUpdOneDto[]): Promise<R> {
    const res = await this.prisma.updateMany<RoleDto>('sys_role', dtos);
    await this.cachePermissionService.clearPermissionsInCache();
    return R.ok(res);
  }

  async delRole(ids: number[]): Promise<R> {
    const res = await this.prisma.deleteById<RoleDto>('sys_role', ids);
    await this.cachePermissionService.clearPermissionsInCache();
    return R.ok(res);
  }
}
