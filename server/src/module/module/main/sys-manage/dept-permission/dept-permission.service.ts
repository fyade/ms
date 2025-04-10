import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../../prisma/prisma.service';
import { R } from '../../../../../common/R';
import { DeptPermissionDto, DeptPermissionSelListDto, DeptPermissionSelAllDto, DeptPermissionInsOneDto, DeptPermissionUpdOneDto, DeptPermissionUpdManyDPDto } from './dto';
import { CachePermissionService } from '../../../../cache/cache.permission.service';
import { BaseContextService } from '../../../../base-context/base-context.service';

@Injectable()
export class DeptPermissionService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly bcs: BaseContextService,
    private readonly cachePermissionService: CachePermissionService,
  ) {
    this.bcs.setFieldSelectParam('sys_dept_permission', {
      notNullKeys: ['deptId', 'permissionId'],
      numberKeys: ['deptId', 'permissionId'],
    })
  }

  async selDeptPermission(dto: DeptPermissionSelListDto): Promise<R> {
    const res = await this.prisma.findPage<DeptPermissionDto, DeptPermissionSelListDto>('sys_dept_permission', {
      data: dto,
      orderBy: false,
    });
    return R.ok(res);
  }

  async selAllDeptPermission(dto: DeptPermissionSelAllDto): Promise<R> {
    const res = await this.prisma.findAll<DeptPermissionDto>('sys_dept_permission', {
      data: dto,
      orderBy: false,
    });
    return R.ok(res);
  }

  async selOnesDeptPermission(ids: number[]): Promise<R> {
    const res = await this.prisma.findByIds<DeptPermissionDto>('sys_dept_permission', Object.values(ids).map(n => Number(n)));
    return R.ok(res);
  }

  async selOneDeptPermission(id: number): Promise<R> {
    const res = await this.prisma.findById<DeptPermissionDto>('sys_dept_permission', Number(id));
    return R.ok(res);
  }

  async updDeptPermissionDp(dto: DeptPermissionUpdManyDPDto): Promise<R> {
    const allDeptPermission = await this.prisma.findAll<DeptPermissionDto>('sys_dept_permission', {
      data: { deptId: dto.deptId },
    });
    const perIds = allDeptPermission.map(item => item.permissionId);
    const addDPSPIDS = dto.permissionId.filter(item => perIds.indexOf(item) === -1);
    const delDPS = perIds.filter(item => dto.permissionId.indexOf(item) === -1);
    const delids = allDeptPermission.filter(item => delDPS.indexOf(item.permissionId) > -1).map(item => item.id);
    await this.prisma.deleteById('sys_dept_permission', delids);
    const addDPS = addDPSPIDS.map(item => ({
      deptId: dto.deptId,
      permissionId: item,
    }));
    await this.prisma.createMany('sys_dept_permission', addDPS);
    await this.cachePermissionService.clearPermissionsInCache();
    return R.ok(true);
  }

  async delDeptPermission(ids: number[]): Promise<R> {
    const res = await this.prisma.deleteById<DeptPermissionDto>('sys_dept_permission', ids);
    await this.cachePermissionService.clearPermissionsInCache();
    return R.ok(res);
  }
}
