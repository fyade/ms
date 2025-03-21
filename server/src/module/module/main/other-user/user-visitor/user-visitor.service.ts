import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../../prisma/prisma.service';
import { R } from '../../../../../common/R';
import { UserVisitorDto, UserVisitorSelListDto, AdminNewUserVisitorDto, ResetUserVisitorPsdDto } from './dto';
import { base } from '../../../../../util/base';
import { UserRoleDto } from '../../sys-manage/user-role/dto';
import { RoleDto } from '../../sys-manage/role/dto';
import { UserDeptDto } from '../../sys-manage/user-dept/dto';
import { DeptDto } from '../../sys-manage/dept/dto';
import { UserUserGroupDto } from '../../../algorithm/user-user-group/dto';
import { UserGroupDto } from '../../../algorithm/user-group/dto';
import { BaseContextService } from '../../../../base-context/base-context.service';
import { Exception } from "../../../../../exception/exception";
import { encryptUtils, idUtils } from '@ms/common'

@Injectable()
export class UserVisitorService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly bcs: BaseContextService,
  ) {
    this.bcs.setFieldSelectParam('sys_user_visitor', {
      notNullKeys: ['id', 'username'],
    })
  }

  async selUserVisitor(dto: UserVisitorSelListDto): Promise<R> {
    const ifWithRole = dto.ifWithRole;
    delete dto.ifWithRole;
    const res = await this.prisma.findPage<UserVisitorDto, UserVisitorSelListDto>('sys_user_visitor', {
      data: dto,
      orderBy: false,
    });
    res.list.forEach(item => {
      delete item.password;
    });
    if (ifWithRole !== base.Y) {
      return R.ok(res);
    }
    const res2 = [];
    const userIds = res.list.map(item => item.id);
    const allUserRolesOfThoseUsers = await this.prisma.findAll<UserRoleDto>('sys_user_role', {
      data: {
        userId: {
          in: {
            value: userIds
          },
        },
        login_role: 'visitor',
      },
    });
    const allRoleIdsOfThoseUsers = allUserRolesOfThoseUsers.map(item => item.roleId);
    const allRolesOfThoseUsers = await this.prisma.findAll<RoleDto>('sys_role', {
      data: {
        id: {
          in: {
            value: allRoleIdsOfThoseUsers
          },
        },
      },
    });
    const allUserDeptsOfThoseUsers = await this.prisma.findAll<UserDeptDto>('sys_user_dept', {
      data: {
        userId: {
          in: {
            value: userIds
          },
        },
        login_role: 'visitor',
      },
    });
    const allUserDeptIdsOfThoseUsers = allUserDeptsOfThoseUsers.map(item => item.deptId);
    const allDeptsOfThoseUsers = await this.prisma.findAll<DeptDto>('sys_dept', {
      data: {
        id: {
          in: {
            value: allUserDeptIdsOfThoseUsers
          },
        },
      },
    });
    const allUserUserGroupsOfThoseUsers = await this.prisma.findAll<UserUserGroupDto>('sys_user_user_group', {
      data: {
        userId: {
          in: {
            value: userIds
          },
        },
        login_role: 'visitor',
      },
    });
    const allUserUserGroupIdsOfThoseUsers = allUserUserGroupsOfThoseUsers.map(item => item.userGroupId);
    const allUserGroupsOfThoseUsers = await this.prisma.findAll<UserGroupDto>('sys_user_group', {
      data: {
        id: {
          in: {
            value: allUserUserGroupIdsOfThoseUsers
          },
        },
      },
    });
    for (let i = 0; i < res.list.length; i++) {
      const roleIdsOfThisUser = allUserRolesOfThoseUsers.filter(item => item.userId === res.list[i].id).map(item => item.roleId);
      const rolesOfThisUser = allRolesOfThoseUsers.filter(item => roleIdsOfThisUser.indexOf(item.id) > -1);
      const deptIdsOfThisUser = allUserDeptsOfThoseUsers.filter(item => item.userId === res.list[i].id).map(item => item.deptId);
      const deptsOfThisUser = allDeptsOfThoseUsers.filter(item => deptIdsOfThisUser.indexOf(item.id) > -1);
      const ugIdsOfThisUser = allUserUserGroupsOfThoseUsers.filter(item => item.userId === res.list[i].id).map(item => item.userGroupId);
      const ugsOfThisUser = allUserGroupsOfThoseUsers.filter(item => ugIdsOfThisUser.indexOf(item.id) > -1);
      res2.push({
        ...res.list[i],
        roles: rolesOfThisUser,
        depts: deptsOfThisUser,
        ugs: ugsOfThisUser,
      });
    }
    return R.ok({
      ...res,
      list: res2,
    });
  }

  async insUserVisitor(dto: AdminNewUserVisitorDto): Promise<R> {
    const userVisitor = await this.prisma.findFirst<UserVisitorDto>('sys_user_visitor', { username: dto.username });
    if (userVisitor) {
      throw new Exception('用户名已存在。');
    }
    await this.prisma.create('sys_user_visitor', {
      ...dto,
      password: await encryptUtils.hashPassword(dto.password),
      id: idUtils.genId(10, false),
    }, { ifCustomizeId: true });
    return R.ok();
  }

  async adminResetUserVisitorPsd(dto: ResetUserVisitorPsdDto): Promise<R> {
    await this.prisma.updateById('sys_user_visitor', { ...dto, password: await encryptUtils.hashPassword(dto.password) });
    return R.ok();
  }
}
