import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../../prisma/prisma.service';
import { R } from '../../../../../common/R';
import { TableRowPermissionDto, TableRowPermissionSelListDto, TableRowPermissionSelAllDto, TableRowPermissionInsOneDto, TableRowPermissionUpdOneDto } from './dto';
import { BaseContextService } from '../../../../base-context/base-context.service';

@Injectable()
export class TableRowPermissionService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly bcs: BaseContextService,
  ) {
    this.bcs.setFieldSelectParam('sys_table_row_permission', {
      notNullKeys: ['permissionId', 'actionType', 'actionId', 'dataType'],
      numberKeys: ['permissionId'],
      completeMatchingKeys: ['permissionId', 'actionType', 'actionId', 'dataType'],
    })
  }

  async selTableRowPermission(dto: TableRowPermissionSelListDto): Promise<R> {
    const res = await this.prisma.findPage<TableRowPermissionDto, TableRowPermissionSelListDto>('sys_table_row_permission', {
      data: dto,
      orderBy: false,
    });
    return R.ok(res);
  }

  async selAllTableRowPermission(dto: TableRowPermissionSelAllDto): Promise<R> {
    const res = await this.prisma.findAll<TableRowPermissionDto>('sys_table_row_permission', {
      data: dto,
      orderBy: false,
    });
    return R.ok(res);
  }

  async selOnesTableRowPermission(ids: number[]): Promise<R> {
    const res = await this.prisma.findByIds<TableRowPermissionDto>('sys_table_row_permission', Object.values(ids).map(n => Number(n)));
    return R.ok(res);
  }

  async selOneTableRowPermission(id: number): Promise<R> {
    const res = await this.prisma.findById<TableRowPermissionDto>('sys_table_row_permission', Number(id));
    return R.ok(res);
  }

  async insTableRowPermission(dto: TableRowPermissionInsOneDto): Promise<R> {
    const res = await this.prisma.create<TableRowPermissionDto>('sys_table_row_permission', dto);
    return R.ok(res);
  }

  async insTableRowPermissions(dtos: TableRowPermissionInsOneDto[]): Promise<R> {
    const res = await this.prisma.createMany<TableRowPermissionDto>('sys_table_row_permission', dtos);
    return R.ok(res);
  }

  async updTableRowPermission(dto: TableRowPermissionUpdOneDto): Promise<R> {
    const res = await this.prisma.updateById<TableRowPermissionDto>('sys_table_row_permission', dto);
    return R.ok(res);
  }

  async updTableRowPermissions(dtos: TableRowPermissionUpdOneDto[]): Promise<R> {
    const res = await this.prisma.updateMany<TableRowPermissionDto>('sys_table_row_permission', dtos);
    return R.ok(res);
  }

  async delTableRowPermission(ids: number[]): Promise<R> {
    const res = await this.prisma.deleteById<TableRowPermissionDto>('sys_table_row_permission', ids);
    return R.ok(res);
  }
}
