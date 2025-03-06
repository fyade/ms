import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../../prisma/prisma.service';
import { R } from '../../../../../common/R';
import { DeptSysDto, DeptSysSelListDto, DeptSysSelAllDto, DeptSysInsOneDto, DeptSysUpdOneDto } from './dto';
import { BaseContextService } from '../../../../base-context/base-context.service';

@Injectable()
export class DeptSysService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly bcs: BaseContextService,
  ) {
    this.bcs.setFieldSelectParam('sys_dept_sys', {
      notNullKeys: ['deptId', 'sysId'],
      numberKeys: ['deptId', 'sysId'],
    })
  }

  async selDeptSys(dto: DeptSysSelListDto): Promise<R> {
    const res = await this.prisma.findPage<DeptSysDto, DeptSysSelListDto>('sys_dept_sys', {
      data: dto,
      orderBy: false,
    });
    return R.ok(res);
  }

  async selAllDeptSys(dto: DeptSysSelAllDto): Promise<R> {
    const res = await this.prisma.findAll<DeptSysDto>('sys_dept_sys', {
      data: dto,
      orderBy: false,
    });
    return R.ok(res);
  }

  async selOnesDeptSys(ids: number[]): Promise<R> {
    const res = await this.prisma.findByIds<DeptSysDto>('sys_dept_sys', Object.values(ids).map(n => Number(n)));
    return R.ok(res);
  }

  async selOneDeptSys(id: number): Promise<R> {
    const res = await this.prisma.findById<DeptSysDto>('sys_dept_sys', Number(id));
    return R.ok(res);
  }

  async insDeptSys(dto: DeptSysInsOneDto): Promise<R> {
    const res = await this.prisma.create<DeptSysDto>('sys_dept_sys', dto);
    return R.ok(res);
  }

  async insDeptSyss(dtos: DeptSysInsOneDto[]): Promise<R> {
    const res = await this.prisma.createMany<DeptSysDto>('sys_dept_sys', dtos);
    return R.ok(res);
  }

  async updDeptSys(dto: DeptSysUpdOneDto): Promise<R> {
    const res = await this.prisma.updateById<DeptSysDto>('sys_dept_sys', dto);
    return R.ok(res);
  }

  async updDeptSyss(dtos: DeptSysUpdOneDto[]): Promise<R> {
    const res = await this.prisma.updateMany<DeptSysDto>('sys_dept_sys', dtos);
    return R.ok(res);
  }

  async delDeptSys(ids: number[]): Promise<R> {
    const res = await this.prisma.deleteById<DeptSysDto>('sys_dept_sys', ids);
    return R.ok(res);
  }
}
