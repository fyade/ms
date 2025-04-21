import { base } from '../util/base';
import { Injectable } from '@nestjs/common';
import { BaseContextService } from '../module/base-context/base-context.service';
import { baseInterfaceColumns2 } from '../module/module/main/sys-util/code-generation/codeGeneration';
import { PrismaClient, Prisma } from '@prisma/client';
import { serverConfig } from "@ms/config";
import { baseUtils } from "@ms/common";

const env = serverConfig.currentConfig();

@Injectable()
export class PrismaoService extends PrismaClient {
  constructor(
    private readonly bcs: BaseContextService,
  ) {
    const dbConfig = {
      datasources: {
        db: {
          url: serverConfig.getMysqlUrlFromEnv(env),
        },
      },
      log: (env.prismaLogLevel && baseUtils.typeOf(env.prismaLogLevel) === 'array') ? (env.prismaLogLevel as Prisma.PrismaClientOptions['log']) : [],
    };
    super(dbConfig);
    // 使用中间件对查询结果中的 Bigint 类型进行序列化
    super.$use(async (params, next) => {
      const t1 = Date.now();
      const result = await next(params);
      const t2 = Date.now();
      if (env.ifLogSQLExecutionTime) {
        console.info(`Query ${params.model}.${params.action} took ${t2 - t1}ms`);
      }
      return this.serialize(result);
    });
  }

  public getOrigin() {
    return this as unknown as PrismaClient;
  }

  protected getUserId() {
    return this.bcs.getUserData().userId || '???';
  }

  protected getLoginRole() {
    return this.bcs.getUserData().loginRole || '???';
  }

  private serialize(obj) {
    if (baseUtils.typeOf(obj) === 'bigint') {
      return parseInt(`${obj}`);
    } else if (baseUtils.typeOf(obj) === 'object') {
      return JSON.parse(
        JSON.stringify(obj, (key, value) => {
          if (baseUtils.typeOf(value) === 'bigint') {
            return parseInt(`${value}`);
          }
          return value;
        }),
      );
    } else if (baseUtils.typeOf(obj) === 'array') {
      return obj.map(item => {
        return this.serialize(item);
      });
    }
    return obj;
  }

  defaultSelArg = ({
                     selKeys = [],
                     ifDeleted = true,
                     ifUseSelfData = false,
                   }: {
                     selKeys?: string[],
                     ifDeleted?: boolean,
                     ifUseSelfData?: boolean,
                   } = {},
  ) => {
    const retObj = {
      ...(selKeys.length > 0 ? {
        select: [...selKeys, ...baseInterfaceColumns2].reduce((o, a) => ({
          ...o,
          [baseUtils.toSnakeCase(a)]: true,
        }), {}),
      } : {}),
      where: {},
    };
    if (ifUseSelfData) {
      retObj.where['create_role'] = this.getLoginRole();
      retObj.where['create_by'] = this.getUserId();
    }
    if (ifDeleted) retObj.where['deleted'] = base.N;
    return retObj;
  };
  defaultInsArg = ({
                     ifCreateRole = true,
                     ifUpdateRole = true,
                     ifCreateBy = true,
                     ifUpdateBy = true,
                     ifCreateTime = true,
                     ifUpdateTime = true,
                     ifDeleted = true,
                   }: {
                     ifCreateRole?: boolean,
                     ifUpdateRole?: boolean,
                     ifCreateBy?: boolean,
                     ifUpdateBy?: boolean,
                     ifCreateTime?: boolean,
                     ifUpdateTime?: boolean,
                     ifDeleted?: boolean,
                   } = {},
  ) => {
    const userid = this.getUserId();
    const time1 = new Date();
    const retObj = {
      data: {
        create_role: this.getLoginRole(),
        update_role: this.getLoginRole(),
        create_by: userid,
        update_by: userid,
        create_time: time1,
        update_time: time1,
        deleted: base.N,
      },
    };
    if (!ifCreateRole) delete retObj.data.create_role;
    if (!ifUpdateRole) delete retObj.data.update_role;
    if (!ifCreateBy) delete retObj.data.create_by;
    if (!ifUpdateBy) delete retObj.data.update_by;
    if (!ifCreateTime) delete retObj.data.create_time;
    if (!ifUpdateTime) delete retObj.data.update_time;
    if (!ifDeleted) delete retObj.data.deleted;
    return retObj;
  };
  defaultUpdArg = ({
                     ifUpdateRole = true,
                     ifUpdateBy = true,
                     ifUpdateTime = true,
                     ifDeleted = true,
                     ifUseSelfData = false,
                   }: {
                     ifUpdateRole?: boolean,
                     ifUpdateBy?: boolean,
                     ifUpdateTime?: boolean,
                     ifDeleted?: boolean,
                     ifUseSelfData?: boolean,
                   } = {},
  ) => {
    const retObj = {
      where: {
        create_role: this.getLoginRole(),
        create_by: this.getUserId(),
        deleted: base.N,
      },
      data: {
        update_role: this.getLoginRole(),
        update_by: this.getUserId(),
        update_time: new Date(),
      },
    };
    if (!ifUpdateRole) delete retObj.data.update_role;
    if (!ifUpdateBy) delete retObj.data.update_by;
    if (!ifUpdateTime) delete retObj.data.update_time;
    if (!ifDeleted) delete retObj.where.deleted;
    if (!ifUseSelfData) {
      delete retObj.where.create_role;
      delete retObj.where.create_by;
    }
    return retObj;
  };
  defaultDelArg = ({
                     ifUseSelfData = false,
                   }: {
                     ifUseSelfData?: boolean
                   } = {},
  ) => {
    const retObj = {
      where: {
        create_role: this.getLoginRole(),
        create_by: this.getUserId(),
        deleted: base.N,
      },
      data: {
        update_role: this.getLoginRole(),
        update_by: this.getUserId(),
        update_time: new Date(),
        deleted: base.Y,
      },
    };
    if (!ifUseSelfData) {
      delete retObj.where.create_role;
      delete retObj.where.create_by;
    }
    return retObj;
  };
}
