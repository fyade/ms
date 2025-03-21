import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../../prisma/prisma.service';
import { R } from '../../../../../common/R';
import { MenuDto, MenuSelListDto, MenuSelAllDto, MenuInsOneDto, MenuUpdOneDto } from './dto';
import { CachePermissionService } from '../../../../cache/cache.permission.service';
import { BaseContextService } from '../../../../base-context/base-context.service';
import { Exception } from "../../../../../exception/exception";

@Injectable()
export class MenuService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly bcs: BaseContextService,
    private readonly cachePermissionService: CachePermissionService,
  ) {
    this.bcs.setFieldSelectParam('sys_menu', {
      notNullKeys: ['label', 'type', 'path', 'parentId', 'component', 'icon', 'orderNum', 'ifLink', 'ifVisible', 'ifDisabled', 'ifPublic', 'ifFixed', 'perms', 'sysId'],
      numberKeys: ['parentId', 'orderNum', 'sysId'],
      completeMatchingKeys: ['type'],
    });
  }

  async selMenu(dto: MenuSelListDto): Promise<R> {
    const res = await this.prisma.findPage<MenuDto, MenuSelListDto>('sys_menu', {
      data: dto,
      orderBy: true,
    });
    return R.ok(res);
  }

  async selAllMenu(dto: MenuSelAllDto): Promise<R> {
    const res = await this.prisma.findAll<MenuDto>('sys_menu', {
      data: dto,
      orderBy: true,
    });
    return R.ok(res);
  }

  async selOnesMenu(ids: number[]): Promise<R> {
    const res = await this.prisma.findByIds<MenuDto>('sys_menu', Object.values(ids).map(n => Number(n)));
    return R.ok(res);
  }

  async selOneMenu(id: number): Promise<R> {
    const res = await this.prisma.findById<MenuDto>('sys_menu', Number(id));
    return R.ok(res);
  }

  async insMenu(dto: MenuInsOneDto): Promise<R> {
    const res = await this.prisma.create<MenuDto>('sys_menu', dto);
    return R.ok(res);
  }

  async insMenus(dtos: MenuInsOneDto[]): Promise<R> {
    const res = await this.prisma.createMany<MenuDto>('sys_menu', dtos);
    return R.ok(res);
  }

  async updMenu(dto: MenuUpdOneDto): Promise<R> {
    if (dto.id === dto.parentId) {
      throw new Exception('父级菜单不可选自己！');
    }
    const res = await this.prisma.updateById<MenuDto>('sys_menu', dto);
    await this.cachePermissionService.clearPermissionsInCache();
    return R.ok(res);
  }

  async updMenus(dtos: MenuUpdOneDto[]): Promise<R> {
    if (dtos.some(item => item.id === item.parentId)) {
      throw new Exception('父级菜单不可选自己！');
    }
    const res = await this.prisma.updateMany<MenuDto>('sys_menu', dtos);
    await this.cachePermissionService.clearPermissionsInCache();
    return R.ok(res);
  }

  async delMenu(ids: number[]): Promise<R> {
    const res = await this.prisma.deleteById<MenuDto>('sys_menu', ids);
    await this.cachePermissionService.clearPermissionsInCache();
    return R.ok(res);
  }
}
