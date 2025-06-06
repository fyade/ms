import { getIpInfoFromRequest } from '../../util/RequestUtils';
import { AuthTypeEnum } from '../../util/base';

export class LogOperationQueueJobDataDto {
  permission: string;
  request: ReturnType<typeof getIpInfoFromRequest>;
  ifSuccess: boolean | string;
  ifIgnoreParamInLog: boolean;
  reqBody: object;
  reqQuery: object;
  reqParam: object;
  reqMethod: string;
  reqId: string;
  userId: string;
  loginRole: string;
  authType: AuthTypeEnum;
  createTime: Date;
}

export class LogScheduledTaskQueueJobDataDto {
  taskTarget: string;
  operateType: string;
  ifSuccess: string;
  remark: string;
  createTime: Date;
}
