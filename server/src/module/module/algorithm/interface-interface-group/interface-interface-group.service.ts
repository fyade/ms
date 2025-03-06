import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { R } from '../../../../common/R';
import { InterfaceInterfaceGroupDto, InterfaceInterfaceGroupSelListDto, InterfaceInterfaceGroupSelAllDto, InterfaceInterfaceGroupInsOneDto, InterfaceInterfaceGroupUpdOneDto, InterfaceInterfaceGroupUpdIIGDto, InterfaceInterfaceGroupUpdIGIDto } from './dto';
import { BaseContextService } from '../../../base-context/base-context.service';

@Injectable()
export class InterfaceInterfaceGroupService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly bcs: BaseContextService,
  ) {
    this.bcs.setFieldSelectParam('sys_interface_interface_group', {
      notNullKeys: ['interfaceId', 'interfaceGroupId'],
      numberKeys: ['interfaceId', 'interfaceGroupId'],
    })
  }

  async selInterfaceInterfaceGroup(dto: InterfaceInterfaceGroupSelListDto): Promise<R> {
    const res = await this.prisma.findPage<InterfaceInterfaceGroupDto, InterfaceInterfaceGroupSelListDto>('sys_interface_interface_group', {
      data: dto,
      orderBy: false,
    });
    return R.ok(res);
  }

  async selAllInterfaceInterfaceGroup(dto: InterfaceInterfaceGroupSelAllDto): Promise<R> {
    const res = await this.prisma.findAll<InterfaceInterfaceGroupDto>('sys_interface_interface_group', {
      data: dto,
      orderBy: false,
    });
    return R.ok(res);
  }

  async selOnesInterfaceInterfaceGroup(ids: number[]): Promise<R> {
    const res = await this.prisma.findByIds<InterfaceInterfaceGroupDto>('sys_interface_interface_group', Object.values(ids).map(n => Number(n)));
    return R.ok(res);
  }

  async selOneInterfaceInterfaceGroup(id: number): Promise<R> {
    const res = await this.prisma.findById<InterfaceInterfaceGroupDto>('sys_interface_interface_group', Number(id));
    return R.ok(res);
  }

  async updInterfaceInterfaceGroupIIG(dto: InterfaceInterfaceGroupUpdIIGDto) {
    const allInterfaceGroupsOfThisInterface = await this.prisma.findAll<InterfaceInterfaceGroupDto>('sys_interface_interface_group', {
      data: { interfaceId: dto.interfaceId },
    });
    const allInterfaceGroupIdsOfThisInterface = allInterfaceGroupsOfThisInterface.map(item => item.interfaceGroupId);
    const interfaceGroupIds = dto.interfaceGroupId.filter(item => allInterfaceGroupIdsOfThisInterface.indexOf(item) === -1);
    const data = interfaceGroupIds.map(interfaceGroupId => ({
      interfaceGroupId: interfaceGroupId,
      interfaceId: dto.interfaceId,
    }));
    const deleteIds = allInterfaceGroupsOfThisInterface.filter(item => dto.interfaceGroupId.indexOf(item.interfaceGroupId) === -1).map(item => item.id);
    await this.prisma.createMany('sys_interface_interface_group', data);
    await this.prisma.deleteById('sys_interface_interface_group', deleteIds);
    return R.ok();
  }

  async updInterfaceInterfaceGroupIGI(dto: InterfaceInterfaceGroupUpdIGIDto) {
    const allInterfacesOfThisInterfaceGroup = await this.prisma.findAll<InterfaceInterfaceGroupDto>('sys_interface_interface_group', {
      data: { interfaceGroupId: dto.interfaceGroupId },
    });
    const allInterfaceIdsOfThisInterfaceGroup = allInterfacesOfThisInterfaceGroup.map(item => item.interfaceId);
    const interfaceIds = dto.interfaceId.filter(item => allInterfaceIdsOfThisInterfaceGroup.indexOf(item) === -1);
    const data = interfaceIds.map(interfaceId => ({
      interfaceId: interfaceId,
      interfaceGroupId: dto.interfaceGroupId,
    }));
    await this.prisma.createMany('sys_interface_interface_group', data);
    return R.ok();
  }

  async delInterfaceInterfaceGroup(ids: number[]): Promise<R> {
    const res = await this.prisma.deleteById<InterfaceInterfaceGroupDto>('sys_interface_interface_group', ids);
    return R.ok(res);
  }
}
