import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { DicTypeDto } from "../module/main/sys-manage/dic-type/dto";
import { base } from "../../util/base";
import { DicDataDto } from "../module/main/sys-manage/dic-data/dto";

@Injectable()
export class CommonService {
  constructor(
    private readonly prisma: PrismaService,
  ) {
  }

  async selDicDataOfType(perm: string, label: string = '') {
    const dicTypeDto = await this.prisma.findFirst<DicTypeDto>('sys_dic_type', {
      type: perm,
      ifDisabled: base.N,
    });
    const ret: DicDataDto[] = [];
    if (dicTypeDto) {
      const dicDataDtos = await this.prisma.findAll<DicDataDto>('sys_dic_data', {
        data: { label: label, dicTypeId: dicTypeDto.id, ifDisabled: base.N },
        orderBy: true,
      });
      ret.push(...dicDataDtos);
    }
    return ret;
  }
}
