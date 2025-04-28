import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../../prisma/prisma.service';
import { R } from '../../../../../common/R';
import { UserApiKeyDto, UserApiKeySelListDto, UserApiKeySelAllDto, UserApiKeyInsOneDto, UserApiKeyUpdOneDto } from './dto';
import { BaseContextService } from '../../../../base-context/base-context.service';
import { idUtils } from '@ms/common';

@Injectable()
export class UserApiKeyService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly bcs: BaseContextService,
  ) {
    this.bcs.setFieldSelectParam('sys_user_api_key', {
      notNullKeys: ['userId', 'userRole', 'apiKey'],
    });
  }

  async selUserApiKey(dto: UserApiKeySelListDto): Promise<R> {
    const res = await this.prisma.findPage<UserApiKeyDto, UserApiKeySelListDto>('sys_user_api_key', {
      data: dto,
      orderBy: false,
    });
    return R.ok(res);
  }

  async selAllUserApiKey(dto: UserApiKeySelAllDto): Promise<R> {
    const res = await this.prisma.findAll<UserApiKeyDto>('sys_user_api_key', {
      data: dto,
      orderBy: false,
    });
    return R.ok(res);
  }

  async selOnesUserApiKey(ids: number[]): Promise<R> {
    const res = await this.prisma.findByIds<UserApiKeyDto>('sys_user_api_key', Object.values(ids).map(n => Number(n)));
    return R.ok(res);
  }

  async selOneUserApiKey(id: number): Promise<R> {
    const res = await this.prisma.findById<UserApiKeyDto>('sys_user_api_key', Number(id));
    return R.ok(res);
  }

  async insUserApiKey(dto: UserApiKeyInsOneDto): Promise<R> {
    dto.apiKey = idUtils.genId()
    const res = await this.prisma.create<UserApiKeyDto>('sys_user_api_key', dto);
    return R.ok(res);
  }

  async insUserApiKeys(dtos: UserApiKeyInsOneDto[]): Promise<R> {
    dtos.forEach(dto => {
      dto.apiKey = idUtils.genId()
    })
    const res = await this.prisma.createMany<UserApiKeyDto>('sys_user_api_key', dtos);
    return R.ok(res);
  }

  async updUserApiKey(dto: UserApiKeyUpdOneDto): Promise<R> {
    delete dto.apiKey
    const res = await this.prisma.updateById<UserApiKeyDto>('sys_user_api_key', dto);
    return R.ok(res);
  }

  async updUserApiKeys(dtos: UserApiKeyUpdOneDto[]): Promise<R> {
    dtos.forEach(dto => {
      delete dto.apiKey
    })
    const res = await this.prisma.updateMany<UserApiKeyDto>('sys_user_api_key', dtos);
    return R.ok(res);
  }

  async delUserApiKey(ids: number[]): Promise<R> {
    const res = await this.prisma.deleteById<UserApiKeyDto>('sys_user_api_key', ids);
    return R.ok(res);
  }
}
