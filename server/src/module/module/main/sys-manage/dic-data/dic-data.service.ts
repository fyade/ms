import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../../prisma/prisma.service';
import { R } from '../../../../../common/R';
import { DicDataDto, DicDataSelListDto, DicDataSelAllDto, DicDataInsOneDto, DicDataUpdOneDto } from './dto';
import { base } from '../../../../../util/base';
import { BaseContextService } from '../../../../base-context/base-context.service';
import { Exception } from "../../../../../exception/Exception";
import { CommonService } from "../../../../common/common.service";

@Injectable()
export class DicDataService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly bcs: BaseContextService,
    private readonly commonService: CommonService,
  ) {
    this.bcs.setFieldSelectParam('sys_dic_data', {
      notNullKeys: ['label', 'value', 'dicTypeId', 'ifDefault', 'ifDisabled', 'orderNum'],
      numberKeys: ['dicTypeId', 'orderNum'],
    })
  }

  async selDicDataOfType(perm: string, label: string = ''): Promise<R<DicDataDto[]>> {
    const dicDataDtos = await this.commonService.selDicDataOfType(perm,label);
    return R.ok(dicDataDtos);
  }

  async selDicData(dto: DicDataSelListDto): Promise<R> {
    const res = await this.prisma.findPage<DicDataDto, DicDataSelListDto>('sys_dic_data', {
      data: dto,
      orderBy: true,
    });
    return R.ok(res);
  }

  async selAllDicData(dto: DicDataSelAllDto): Promise<R<DicDataDto[]>> {
    const res = await this.prisma.findAll<DicDataDto>('sys_dic_data', {
      data: dto,
      orderBy: true,
    });
    return R.ok(res);
  }

  async selOnesDicData(ids: number[]): Promise<R> {
    const res = await this.prisma.findByIds<DicDataDto>('sys_dic_data', Object.values(ids).map(n => Number(n)));
    return R.ok(res);
  }

  async selOneDicData(id: number): Promise<R> {
    const res = await this.prisma.findById<DicDataDto>('sys_dic_data', Number(id));
    return R.ok(res);
  }

  async insDicData(dto: DicDataInsOneDto): Promise<R> {
    if (dto.ifDefault === base.Y) {
      const r = await this.selAllDicData({ dicTypeId: dto.dicTypeId });
      const upds = r.data.filter(item => item.ifDefault === base.Y).map(item => {
        item.ifDefault = base.N;
        return item;
      });
      if (upds.length > 0) {
        await this.updDicDatas(upds);
      }
    }
    const res = await this.prisma.create<DicDataDto>('sys_dic_data', dto);
    return R.ok(res);
  }

  async insDicDatas(dtos: DicDataInsOneDto[]): Promise<R> {
    const dicDataInsOneDtos = dtos.filter(item => item.ifDefault === base.Y);
    if (dicDataInsOneDtos.length > 1) {
      throw new Exception('只允许有一个默认值。');
    }
    if (dicDataInsOneDtos.length === 1) {
      const r = await this.selAllDicData({ dicTypeId: dicDataInsOneDtos[0].dicTypeId });
      const upds = r.data.filter(item => item.ifDefault === base.Y).map(item => {
        item.ifDefault = base.N;
        return item;
      });
      if (upds.length > 0) {
        await this.updDicDatas(upds);
      }
    }
    const res = await this.prisma.createMany<DicDataDto>('sys_dic_data', dtos);
    return R.ok(res);
  }

  async updDicData(dto: DicDataUpdOneDto): Promise<R> {
    if (dto.ifDefault === base.Y) {
      const r = await this.selAllDicData({ dicTypeId: dto.dicTypeId });
      const upds = r.data.filter(item => item.ifDefault === base.Y && item.id !== dto.id).map(item => {
        item.ifDefault = base.N;
        return item;
      });
      if (upds.length > 0) {
        await this.updDicDatas(upds);
      }
    }
    const res = await this.prisma.updateById<DicDataDto>('sys_dic_data', dto);
    return R.ok(res);
  }

  async updDicDatas(dtos: DicDataUpdOneDto[]): Promise<R> {
    const dicDataUpdOneDtos = dtos.filter(item => item.ifDefault === base.Y);
    if (dicDataUpdOneDtos.length > 1) {
      throw new Exception('只允许有一个默认值。');
    }
    if (dicDataUpdOneDtos.length === 1) {
      const r = await this.selAllDicData({ dicTypeId: dicDataUpdOneDtos[0].dicTypeId });
      const upds = r.data.filter(item => item.ifDefault === base.Y && item.id !== dicDataUpdOneDtos[0].id).map(item => {
        item.ifDefault = base.N;
        return item;
      });
      if (upds.length > 0) {
        await this.updDicDatas(upds);
      }
    }
    const res = await this.prisma.updateMany<DicDataDto>('sys_dic_data', dtos);
    return R.ok(res);
  }

  async delDicData(ids: number[]): Promise<R> {
    const res = await this.prisma.deleteById<DicDataDto>('sys_dic_data', ids);
    return R.ok(res);
  }
}
