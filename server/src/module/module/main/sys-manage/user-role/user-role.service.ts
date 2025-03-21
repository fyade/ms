import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../../prisma/prisma.service';
import { R } from '../../../../../common/R';
import { UserPermissionDeniedException } from '../../../../../exception/user-permission-denied.exception';
import { AuthService } from '../../../../auth/auth.service';
import { UserRoleDto, UserRoleSelListDto, UserRoleSelAllDto, UserRoleInsOneDto, UserRoleUpdOneDto, UserRoleUpdManyURDto, UserRoleUpdManyRUDto } from './dto';
import { CachePermissionService } from '../../../../cache/cache.permission.service';
import { BaseContextService } from '../../../../base-context/base-context.service';

@Injectable()
export class UserRoleService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly authService: AuthService,
    private readonly cachePermissionService: CachePermissionService,
    private readonly bcs: BaseContextService,
  ) {
    this.bcs.setFieldSelectParam('sys_user_role', {
      notNullKeys: ['userId', 'roleId', 'loginRole'],
      numberKeys: ['roleId'],
      completeMatchingKeys: ['userId', 'roleId', 'loginRole'],
    })
  }

  async selUserRole(dto: UserRoleSelListDto): Promise<R> {
    const res = await this.prisma.findPage<UserRoleDto, UserRoleSelListDto>('sys_user_role', {
      data: dto,
      orderBy: false,
    });
    return R.ok(res);
  }

  async selAllUserRole(dto: UserRoleSelAllDto): Promise<R> {
    const res = await this.prisma.findAll<UserRoleDto>('sys_user_role', {
      data: dto,
      orderBy: false,
    });
    return R.ok(res);
  }

  async selOneUserRole(id: number): Promise<R> {
    const one = await this.prisma.findById<UserRoleDto>('sys_user_role', Number(id));
    return R.ok(one);
  }

  async updUserRoleUR(dto: UserRoleUpdManyURDto): Promise<R> {
    if (!await this.authService.ifAdminUserUpdNotAdminUser(this.bcs.getUserData().userId, dto.userId)) {
      throw new UserPermissionDeniedException();
    }
    const allRoles = await this.prisma.findAll<UserRoleUpdOneDto>('sys_user_role', { data: { userId: dto.userId } });
    const allRoleIds = allRoles.map(item => item.roleId);
    const addRoles = dto.roleId.filter(id => allRoleIds.indexOf(id) === -1);
    const delRoleIds = allRoleIds.filter(id => dto.roleId.indexOf(id) === -1);
    const delIds = allRoles.filter(item => delRoleIds.indexOf(item.roleId) > -1).map(item => item.id);
    await this.prisma.deleteById('sys_user_role', delIds);
    await this.prisma.createMany('sys_user_role', addRoles.map(item => ({ userId: dto.userId, roleId: item, loginRole: dto.loginRole })));
    await this.cachePermissionService.clearPermissionsInCache();
    return R.ok();
  }

  async updUserRoleRU(dto: UserRoleUpdManyRUDto): Promise<R> {
    const data = [];
    const allUsersOfThisRole = await this.prisma.findAll<UserRoleDto>('sys_user_role', {
      data: { roleId: dto.roleId },
    });
    const allUserIdsOfThisRole = allUsersOfThisRole.map(item => item.userId);
    const userIds = dto.userId.filter(item => allUserIdsOfThisRole.indexOf(item) === -1);
    for (let i = 0; i < userIds.length; i++) {
      const userId = userIds[i];
      if (!await this.authService.ifAdminUserUpdNotAdminUser(this.bcs.getUserData().userId, userId)) {
        throw new UserPermissionDeniedException();
      }
      data.push({
        userId: userId,
        roleId: dto.roleId,
        loginRole: dto.loginRole,
      });
    }
    await this.prisma.createMany('sys_user_role', data);
    await this.cachePermissionService.clearPermissionsInCache();
    return R.ok();
  }

  async delUserRole(ids: number[]): Promise<R> {
    await this.prisma.deleteById<UserRoleDto>('sys_user_role', ids);
    await this.cachePermissionService.clearPermissionsInCache();
    return R.ok();
  }
}
