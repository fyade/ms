import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../../prisma/prisma.service';
import { R } from '../../../../../common/R';
import { AdminNewUserDto, LoginDto, RegistDto, ResetUserPsdDto, UpdPsdDto, UserDto, UserSelListDto } from './dto';
import { AuthService } from '../../../../auth/auth.service';
import { HTTP } from '../../../../../common/Enum';
import { base } from '../../../../../util/base';
import { UserRoleDto } from '../user-role/dto';
import { UserUnknownException } from '../../../../../exception/user-unknown.exception';
import { UserPermissionDeniedException } from '../../../../../exception/user-permission-denied.exception';
import { LogUserLoginService } from '../../sys-log/log-user-login/log-user-login.service';
import { UserDeptDto } from '../user-dept/dto';
import { UserGroupDto } from '../../../algorithm/user-group/dto';
import { UserUserGroupDto } from '../../../algorithm/user-user-group/dto';
import { RoleDto } from '../role/dto';
import { DeptDto } from '../dept/dto';
import { CacheTokenService } from '../../../../cache/cache.token.service';
import { BaseContextService } from '../../../../base-context/base-context.service';
import { NOT_ADMIN, PASSWORD_ERROR } from '../../sys-log/log-user-login/dto';
import { UserVisitorDto } from '../../other-user/user-visitor/dto';
import * as svgCaptcha from 'svg-captcha';
import { Exception } from "../../../../../exception/exception";
import { cryptUtils, encryptUtils, idUtils, timeUtils } from '@ms/common'
import { serverConfig } from "@ms/config";
import { PrismaoService } from "../../../../../prisma/prismao.service";

@Injectable()
export class UserService {
  private maxLoginFailCount: number;

  constructor(
    private readonly prisma: PrismaService,
    private readonly prismao: PrismaoService,
    private readonly authService: AuthService,
    private readonly logUserLoginService: LogUserLoginService,
    private readonly cacheTokenService: CacheTokenService,
    private readonly bcs: BaseContextService,
  ) {
    this.maxLoginFailCount = 10;
    this.bcs.setFieldSelectParam('sys_user', {
      notNullKeys: ['id', 'username'],
    });
  }

  async selUser(dto: UserSelListDto): Promise<R> {
    const ifWithRole = dto.ifWithRole;
    delete dto.ifWithRole;
    const res = await this.prisma.findPage<UserDto, UserSelListDto>('sys_user', {
      data: dto,
      orderBy: false,
    });
    res.list.forEach(item => {
      delete item.password;
    });
    if (ifWithRole !== base.Y) {
      return R.ok(res);
    }
    const topAdminUser = await this.prisma.findAll<{ id: number; userId: string }>('sys_admin_top', {
      data: {
        userId: {
          in: {
            value: res.list.map(item => item.id),
          },
        },
      },
    });
    const res2 = [];
    const userIds = res.list.map(item => item.id);
    const allUserRolesOfThoseUsers = await this.prisma.findAll<UserRoleDto>('sys_user_role', {
      data: {
        userId: {
          in: {
            value: userIds,
          },
        },
        login_role: 'admin',
      },
    });
    const allRoleIdsOfThoseUsers = allUserRolesOfThoseUsers.map(item => item.roleId);
    const allRolesOfThoseUsers = await this.prisma.findAll<RoleDto>('sys_role', {
      data: {
        id: {
          in: {
            value: allRoleIdsOfThoseUsers,
          },
        },
      },
    });
    const allUserDeptsOfThoseUsers = await this.prisma.findAll<UserDeptDto>('sys_user_dept', {
      data: {
        userId: {
          in: {
            value: userIds,
          },
        },
        login_role: 'admin',
      },
    });
    const allUserDeptIdsOfThoseUsers = allUserDeptsOfThoseUsers.map(item => item.deptId);
    const allDeptsOfThoseUsers = await this.prisma.findAll<DeptDto>('sys_dept', {
      data: {
        id: {
          in: {
            value: allUserDeptIdsOfThoseUsers,
          },
        },
      },
    });
    const allUserUserGroupsOfThoseUsers = await this.prisma.findAll<UserUserGroupDto>('sys_user_user_group', {
      data: {
        userId: {
          in: {
            value: userIds,
          },
        },
        login_role: 'admin',
      },
    });
    const allUserUserGroupIdsOfThoseUsers = allUserUserGroupsOfThoseUsers.map(item => item.userGroupId);
    const allUserGroupsOfThoseUsers = await this.prisma.findAll<UserGroupDto>('sys_user_group', {
      data: {
        id: {
          in: {
            value: allUserUserGroupIdsOfThoseUsers,
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
        ifTopAdmin: topAdminUser.findIndex(item => item.userId === res.list[i].id) > -1,
      });
    }
    return R.ok({
      ...res,
      list: res2,
    });
  }

  async getSelfInfo(): Promise<R> {
    const loginRole = this.bcs.getUserData().loginRole;
    const userId = this.bcs.getUserData().userId;
    if (loginRole === 'admin') {
      const user = await this.prisma.findById<UserDto>('sys_user', userId);
      delete user.password;
      return R.ok(user);
    }
    if (loginRole === 'visitor') {
      const user = await this.prisma.findById<UserVisitorDto>('sys_user_visitor', userId);
      delete user.password;
      return R.ok(user);
    }
    throw new Exception('');
  }

  async selOnesUser(ids: string[]): Promise<R> {
    const res = await this.prisma.findByIds<UserDto>('sys_user', Object.values(ids));
    res.forEach(item => {
      delete item.password;
    });
    return R.ok(res);
  }

  async insUser(dto: AdminNewUserDto): Promise<R> {
    const user = await this.prisma.findFirst('sys_user', { username: dto.username });
    if (user) {
      throw new Exception('用户名已存在。');
    }
    await this.prisma.create('sys_user', {
      ...dto,
      password: await encryptUtils.hashPassword(dto.password),
      id: idUtils.genId(5, false),
    }, { ifCustomizeId: true });
    return R.ok(true);
  }

  async updUser(dto: UserDto): Promise<R> {
    const loginRole = this.bcs.getUserData().loginRole;
    const userId = this.bcs.getUserData().userId;
    if (loginRole === 'admin') {
      await this.prisma.updateById('sys_user', dto);
      return R.ok(true);
    }
    if (loginRole === 'visitor') {
      await this.prisma.updateById('sys_user_visitor', dto);
      return R.ok(true);
    }
    throw new Exception('');
  }

  async updPsd(dto: UpdPsdDto): Promise<R> {
    const loginRole = this.bcs.getUserData().loginRole;
    const userId = this.bcs.getUserData().userId;
    if (loginRole === 'admin') {
      const user_ = await this.prisma.findById<UserDto>('sys_user', userId);
      const ifUserYes = await encryptUtils.comparePassword(dto.oldp, user_.password);
      if (!ifUserYes) {
        throw new Exception('旧密码错误。');
      }
      await this.prisma.updateById('sys_user', {
        id: user_.id,
        password: await encryptUtils.hashPassword(dto.newp1),
      });
      return R.ok(true);
    }
    if (loginRole === 'visitor') {
      const user_ = await this.prisma.findById<UserVisitorDto>('sys_user_visitor', userId);
      const ifUserYes = await encryptUtils.comparePassword(dto.oldp, user_.password);
      if (!ifUserYes) {
        throw new Exception('旧密码错误。');
      }
      await this.prisma.updateById('sys_user_visitor', {
        id: user_.id,
        password: await encryptUtils.hashPassword(dto.newp1),
      });
      return R.ok(true);
    }
    throw new Exception('');
  }

  async adminResetUserPsd(dto: ResetUserPsdDto): Promise<R> {
    if (!await this.authService.ifAdminUserUpdNotAdminUser(this.bcs.getUserData().userId, dto.id)) {
      throw new UserPermissionDeniedException();
    }
    await this.prisma.updateById('sys_user', { ...dto, password: await encryptUtils.hashPassword(dto.password) });
    return R.ok(true);
  }

  async generateKey(): Promise<R> {
    const key = await cryptUtils.rsa.generateKey()
    const uuid = idUtils.randomUUID();
    await this.cacheTokenService.savePasswordKey(uuid, key);
    return R.ok({
      uuid,
      publicKey: key.publicKey,
    });
  }

  async regist(dto: RegistDto): Promise<R> {
    const sysConfigs = await this.prismao.getOrigin().sys_config.findMany({
      where: {
        ...this.prismao.defaultSelArg().where
      }
    });
    if (sysConfigs.length > 0) {
      const sysConfig = sysConfigs[0];
      if (sysConfig.if_allow_user_regist === base.N) {
        throw new Exception('当前不允许新用户注册。')
      }
    }
    if (dto.loginRole === 'admin') {
      const user = await this.prisma.findFirst<UserDto>('sys_user', {
        username: dto.username,
      });
      if (user) {
        throw new Exception('用户名已被使用。');
      }
      const userid = idUtils.genId(5, false);
      await this.prisma.create<UserDto>('sys_user', {
        id: userid,
        username: dto.username,
        password: await encryptUtils.hashPassword(dto.password),
        createRole: dto.loginRole,
        updateRole: dto.loginRole,
        createBy: userid,
        updateBy: userid,
      }, { ifCustomizeId: true });
      return R.ok('注册成功。');
    }
    if (dto.loginRole === 'visitor') {
      const user = await this.prisma.findFirst<UserVisitorDto>('sys_user_visitor', {
        username: dto.username,
      });
      if (user) {
        throw new Exception('用户名已被使用。');
      }
      const userid = idUtils.genId(10, false);
      await this.prisma.create<UserVisitorDto>('sys_user_visitor', {
        id: userid,
        username: dto.username,
        password: await encryptUtils.hashPassword(dto.password),
        createRole: dto.loginRole,
        updateRole: dto.loginRole,
        createBy: userid,
        updateBy: userid,
      }, { ifCustomizeId: true });
      return R.ok('注册成功。');
    }
  }

  async login(dto: LoginDto, { loginIp, loginBrowser, loginOs }, ifAdminLogin = false): Promise<R<{
    token: string,
    user: UserDto,
    loginRole: string,
  }>> {
    if (!serverConfig.currentConfig().ifIgnoreVerificationCode) {
      const vcode = await this.cacheTokenService.getVerificationCode(dto.verificationCodeUuid);
      if (!vcode) {
        throw new Exception('验证码已过期。');
      }
      await this.cacheTokenService.deleteVerificationCode(dto.verificationCodeUuid);
      if (vcode.toLowerCase() !== dto.verificationCode.toLowerCase()) {
        throw new Exception('验证码错误。');
      }
    }
    await this.cacheTokenService.deletePasswordKey(dto.passwordKeyUuid);
    if (dto.loginRole === 'admin') {
      const user = await this.prisma.findFirst<UserDto>('sys_user', {
        username: dto.username,
      });
      if (!user) {
        throw new UserUnknownException();
      }
      const loginlogs = await this.getLoginLogsOfPasswordError(user.id, loginIp, dto.loginRole);
      if (loginlogs.length >= this.maxLoginFailCount) {
        const sort = loginlogs.sort((a, b) => timeUtils.timestamp(a.createTime) - timeUtils.timestamp(b.createTime));
        const number = Math.ceil(24 - (timeUtils.timestamp() - timeUtils.timestamp(sort[0].createTime)) / (1000 * 60 * 60));
        throw new Exception(`您的账号在当前IP密码错误次数过多，请${number}小时后重试或更换网络环境重试。`);
      }
      const b1 = await encryptUtils.comparePassword(dto.password, user.password);
      if (!b1) {
        await this.insLoginLog(loginIp, loginBrowser, '', loginOs, user.id, dto.loginRole, b1, PASSWORD_ERROR);
        throw new Exception(`密码错误，还剩${this.maxLoginFailCount - loginlogs.length - 1}次机会。`);
      }
      if (!ifAdminLogin) {
        await this.insLoginLog(loginIp, loginBrowser, '', loginOs, user.id, dto.loginRole, b1);
      }
      delete user.password;
      const token = await this.cacheTokenService.genToken(user.id, user.username, dto.loginRole, loginIp, loginOs, loginBrowser);
      return R.ok({
        token: token,
        user: user,
        loginRole: dto.loginRole,
      });
    }
    if (dto.loginRole === 'visitor') {
      const user = await this.prisma.findFirst<UserVisitorDto>('sys_user_visitor', {
        username: dto.username,
      });
      if (!user) {
        throw new UserUnknownException();
      }
      const loginlogs = await this.getLoginLogsOfPasswordError(user.id, loginIp, dto.loginRole);
      if (loginlogs.length >= this.maxLoginFailCount) {
        const sort = loginlogs.sort((a, b) => timeUtils.timestamp(a.createTime) - timeUtils.timestamp(b.createTime));
        const number = Math.ceil(24 - (timeUtils.timestamp() - timeUtils.timestamp(sort[0].createTime)) / (1000 * 60 * 60));
        throw new Exception(`您的账号在当前IP密码错误次数过多，请${number}小时后重试或更换网络环境重试。`);
      }
      const b1 = await encryptUtils.comparePassword(dto.password, user.password);
      if (!b1) {
        await this.insLoginLog(loginIp, loginBrowser, '', loginOs, user.id, dto.loginRole, b1, PASSWORD_ERROR);
        throw new Exception(`密码错误，还剩${this.maxLoginFailCount - loginlogs.length - 1}次机会。`);
      }
      if (!ifAdminLogin) {
        await this.insLoginLog(loginIp, loginBrowser, '', loginOs, user.id, dto.loginRole, b1);
      }
      delete user.password;
      const token = await this.cacheTokenService.genToken(user.id, user.username, dto.loginRole, loginIp, loginOs, loginBrowser);
      return R.ok({
        token: token,
        user: user,
        loginRole: dto.loginRole,
      });
    }
  }

  async adminlogin(dto: LoginDto, { loginIp, loginBrowser, loginOs }): Promise<R> {
    const userinfo = await this.login(dto, { loginIp, loginBrowser, loginOs }, true);
    if (userinfo.code !== HTTP.SUCCESS().code) {
      throw new Exception(userinfo.msg);
    }
    const ifAdminUser = await this.authService.ifAdminUser(userinfo.data.user.id, dto.loginRole);
    if (ifAdminUser) {
      await this.insLoginLog(loginIp, loginBrowser, '', loginOs, userinfo.data.user.id, dto.loginRole, true);
      return R.ok(userinfo.data);
    } else {
      await this.insLoginLog(loginIp, loginBrowser, '', loginOs, userinfo.data.user.id, dto.loginRole, false, NOT_ADMIN, '不是管理员用户');
      throw new Exception('你不是管理员用户。');
    }
  }

  async logOut(): Promise<R> {
    await this.cacheTokenService.deleteToken(this.bcs.getUserData().token);
    return R.ok(true);
  }

  async getVerificationCode(): Promise<R> {
    const captcha = svgCaptcha.create({
      noise: 3,
      ignoreChars: 'Oo01iIlt',
      width: 120,
      height: 40,
      fontSize: 45,
    });
    const text = captcha.text;
    const uuid = idUtils.randomUUID()
    await this.cacheTokenService.saveVerificationCode(uuid, text);
    return R.ok({ uuid, svg: captcha.data });
  }

  private async getLoginLogsOfPasswordError(userId: string, loginIp: string, loginRole: string) {
    const loginLog = await this.logUserLoginService.selAllLogUserLogin({
      userId: userId,
      ifSuccess: base.N,
      failType: PASSWORD_ERROR,
      loginIp: loginIp,
      loginRole: loginRole,
    }, {
      orderBy: { createTime: 'desc' },
      range: {
        createTime: {
          gte: new Date(timeUtils.timestamp() - 1000 * 60 * 60 * 24),
          lte: new Date(timeUtils.timestamp()),
        },
      },
    });
    return loginLog.data;
  }

  private async insLoginLog(loginIp: string, loginBrowser: string, loginPosition: string, loginOs: string, userId: string, loginRole: string, ifSuccess: boolean, failType: string = '', errorRemark: string = '密码错误') {
    await this.logUserLoginService.insLogUserLogin({
      loginIp: loginIp,
      loginBrowser: loginBrowser,
      loginPosition: loginPosition,
      loginOs: loginOs,
      userId: userId,
      ifSuccess: ifSuccess ? base.Y : base.N,
      failType: failType,
      loginRole: loginRole,
      remark: ifSuccess ? '登录成功' : errorRemark ? errorRemark : '密码错误',
    });
  }
}
