import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { R } from '../../../../common/R';
import { InterfaceDto, InterfaceSelListDto, InterfaceSelAllDto, InterfaceInsOneDto, InterfaceUpdOneDto } from './dto';
import { BaseContextService } from '../../../base-context/base-context.service';

@Injectable()
export class InterfaceService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly bcs: BaseContextService,
  ) {
    this.bcs.setFieldSelectParam('sys_interface', {
      notNullKeys: ['label', 'orderNum', 'ifDisabled', 'ifPublic', 'perms', 'url'],
      numberKeys: ['orderNum'],
      completeMatchingKeys: ['perms'],
    });
  }

  async selInterface(dto: InterfaceSelListDto): Promise<R> {
    const res = await this.prisma.findPage<InterfaceDto, InterfaceSelListDto>('sys_interface', {
      data: dto,
      orderBy: true,
    });
    return R.ok(res);
  }

  async selAllInterface(dto: InterfaceSelAllDto): Promise<R<InterfaceDto[]>> {
    const res = await this.prisma.findAll<InterfaceDto>('sys_interface', {
      data: dto,
      orderBy: true,
    });
    return R.ok(res);
  }

  async selOnesInterface(ids: number[]): Promise<R> {
    const res = await this.prisma.findByIds<InterfaceDto>('sys_interface', Object.values(ids).map(n => Number(n)));
    return R.ok(res);
  }

  async selOneInterface(id: number): Promise<R> {
    const res = await this.prisma.findById<InterfaceDto>('sys_interface', Number(id));
    return R.ok(res);
  }

  async insInterface(dto: InterfaceInsOneDto): Promise<R> {
    const res = await this.prisma.create<InterfaceDto>('sys_interface', dto);
    return R.ok(res);
  }

  async insInterfaces(dtos: InterfaceInsOneDto[]): Promise<R> {
    const res = await this.prisma.createMany<InterfaceDto>('sys_interface', dtos);
    return R.ok(res);
  }

  async updInterface(dto: InterfaceUpdOneDto): Promise<R> {
    const res = await this.prisma.updateById<InterfaceDto>('sys_interface', dto);
    return R.ok(res);
  }

  async updInterfaces(dtos: InterfaceUpdOneDto[]): Promise<R> {
    const res = await this.prisma.updateMany<InterfaceDto>('sys_interface', dtos);
    return R.ok(res);
  }

  async delInterface(ids: number[]): Promise<R> {
    const res = await this.prisma.deleteById<InterfaceDto>('sys_interface', ids);
    return R.ok(res);
  }
}
