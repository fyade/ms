import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../../prisma/prisma.service';
import { R } from '../../../../../common/R';
import { MenuThrottleDto, MenuThrottleSelListDto, MenuThrottleSelAllDto, MenuThrottleInsOneDto, MenuThrottleUpdOneDto } from './dto';
import { BaseContextService } from '../../../../base-context/base-context.service';
import { CachePermissionService } from "../../../../cache/cache.permission.service";

@Injectable()
export class MenuThrottleService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly bcs: BaseContextService,
    private readonly cachePermissionService: CachePermissionService,
  ) {
    this.bcs.setFieldSelectParam('sys_menu_throttle', {
      notNullKeys: ['menuId', 'ttl', 'limit', 'type'],
      numberKeys: ['menuId', 'ttl', 'limit'],
    });
  }

  async selMenuThrottle(dto: MenuThrottleSelListDto): Promise<R> {
    const res = await this.prisma.findPage<MenuThrottleDto, MenuThrottleSelListDto>('sys_menu_throttle', {
      data: dto,
      orderBy: false,
    });
    return R.ok(res);
  }

  async selAllMenuThrottle(dto: MenuThrottleSelAllDto): Promise<R> {
    const res = await this.prisma.findAll<MenuThrottleDto>('sys_menu_throttle', {
      data: dto,
      orderBy: false,
    });
    return R.ok(res);
  }

  async selOnesMenuThrottle(ids: number[]): Promise<R> {
    const res = await this.prisma.findByIds<MenuThrottleDto>('sys_menu_throttle', Object.values(ids).map(n => Number(n)));
    return R.ok(res);
  }

  async selOneMenuThrottle(id: number): Promise<R> {
    const res = await this.prisma.findById<MenuThrottleDto>('sys_menu_throttle', Number(id));
    return R.ok(res);
  }

  async insMenuThrottle(dto: MenuThrottleInsOneDto): Promise<R> {
    const res = await this.prisma.create<MenuThrottleDto>('sys_menu_throttle', dto);
    await this.cachePermissionService.clearMenuThrottleInCache();
    return R.ok(res);
  }

  async insMenuThrottles(dtos: MenuThrottleInsOneDto[]): Promise<R> {
    const res = await this.prisma.createMany<MenuThrottleDto>('sys_menu_throttle', dtos);
    await this.cachePermissionService.clearMenuThrottleInCache();
    return R.ok(res);
  }

  async updMenuThrottle(dto: MenuThrottleUpdOneDto): Promise<R> {
    const res = await this.prisma.updateById<MenuThrottleDto>('sys_menu_throttle', dto);
    await this.cachePermissionService.clearMenuThrottleInCache();
    return R.ok(res);
  }

  async updMenuThrottles(dtos: MenuThrottleUpdOneDto[]): Promise<R> {
    const res = await this.prisma.updateMany<MenuThrottleDto>('sys_menu_throttle', dtos);
    await this.cachePermissionService.clearMenuThrottleInCache();
    return R.ok(res);
  }

  async delMenuThrottle(ids: number[]): Promise<R> {
    const res = await this.prisma.deleteById<MenuThrottleDto>('sys_menu_throttle', ids);
    await this.cachePermissionService.clearMenuThrottleInCache();
    return R.ok(res);
  }
}
