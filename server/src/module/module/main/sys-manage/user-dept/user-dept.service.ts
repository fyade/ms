import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../../prisma/prisma.service';
import { R } from '../../../../../common/R';
import { UserPermissionDeniedException } from '../../../../../exception/user-permission-denied.exception';
import { AuthService } from '../../../../auth/auth.service';
import { UserDeptDto, UserDeptSelListDto, UserDeptSelAllDto, UserDeptInsOneDto, UserDeptUpdOneDto, UserDeptUpdUDDto, UserDeptUpdDUDto } from './dto';
import { CachePermissionService } from '../../../../cache/cache.permission.service';
import { BaseContextService } from '../../../../base-context/base-context.service';

@Injectable()
export class UserDeptService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly authService: AuthService,
    private readonly cachePermissionService: CachePermissionService,
    private readonly bcs: BaseContextService,
  ) {
    this.bcs.setFieldSelectParam('sys_user_dept', {
      notNullKeys: ['userId', 'deptId', 'loginRole'],
      numberKeys: ['deptId'],
      completeMatchingKeys: ['userId', 'deptId', 'loginRole'],
    })
  }

  async selUserDept(dto: UserDeptSelListDto): Promise<R> {
    const res = await this.prisma.findPage<UserDeptDto, UserDeptSelListDto>('sys_user_dept', {
      data: dto,
      orderBy: false,
    });
    return R.ok(res);
  }

  async selAllUserDept(dto: UserDeptSelAllDto): Promise<R> {
    const res = await this.prisma.findAll<UserDeptDto>('sys_user_dept', {
      data: dto,
      orderBy: false,
    });
    return R.ok(res);
  }

  async selOnesUserDept(ids: number[]): Promise<R> {
    const res = await this.prisma.findByIds<UserDeptDto>('sys_user_dept', Object.values(ids).map(n => Number(n)));
    return R.ok(res);
  }

  async selOneUserDept(id: number): Promise<R> {
    const res = await this.prisma.findById<UserDeptDto>('sys_user_dept', Number(id));
    return R.ok(res);
  }

  async updUserDeptUD(dto: UserDeptUpdUDDto): Promise<R> {
    if (!await this.authService.ifAdminUserUpdNotAdminUser(this.bcs.getUserData().userId, dto.userId)) {
      throw new UserPermissionDeniedException();
    }
    const allDepts = await this.prisma.findAll<UserDeptDto>('sys_user_dept', { data: { userId: dto.userId } });
    const allDeptIds = allDepts.map(item => item.deptId);
    const addDepts = dto.deptId.filter(id => allDeptIds.indexOf(id) === -1);
    const delDeptIds = allDeptIds.filter(id => dto.deptId.indexOf(id) === -1);
    const delDepts = allDepts.filter(item => delDeptIds.indexOf(item.deptId) > -1).map(item => item.id);
    await this.prisma.deleteById('sys_user_dept', delDepts);
    await this.prisma.createMany('sys_user_dept', addDepts.map(item => ({ userId: dto.userId, deptId: item, loginRole: dto.loginRole })));
    await this.cachePermissionService.clearPermissionsInCache();
    return R.ok(true);
  }

  async updUserDeptDU(dto: UserDeptUpdDUDto): Promise<R> {
    const data = [];
    const allUsersOfThisDept = await this.prisma.findAll<UserDeptDto>('sys_user_dept', {
      data: { deptId: dto.deptId },
    });
    const allUserIdsOfThisDept = allUsersOfThisDept.map(item => item.userId);
    const userIds = dto.userId.filter(item => allUserIdsOfThisDept.indexOf(item) === -1);
    for (let i = 0; i < userIds.length; i++) {
      const userId = userIds[i];
      if (!await this.authService.ifAdminUserUpdNotAdminUser(this.bcs.getUserData().userId, userId)) {
        throw new UserPermissionDeniedException();
      }
      data.push({
        userId: userId,
        deptId: dto.deptId,
        loginRole: dto.loginRole,
      });
    }
    await this.prisma.createMany('sys_user_dept', data);
    await this.cachePermissionService.clearPermissionsInCache();
    return R.ok(true);
  }

  async delUserDept(ids: number[]): Promise<R> {
    const res = await this.prisma.deleteById<UserDeptDto>('sys_user_dept', ids);
    await this.cachePermissionService.clearPermissionsInCache();
    return R.ok(res);
  }
}
