import { getIpInfoFromRequest } from "../../util/RequestUtils";

export class LogOperationQueueJobDataDto {
  permission: string
  request: ReturnType<typeof getIpInfoFromRequest>
  ifSuccess: boolean | string
  ifIgnoreParamInLog: boolean
  reqBody: object
  reqQuery: object
  reqMethod: string
  reqId: string
  userId: string
  loginRole: string
}

export class LogScheduledTaskQueueJobDataDto {
  taskTarget: string
  operateType: string
  ifSuccess: string
  remark: string
}
