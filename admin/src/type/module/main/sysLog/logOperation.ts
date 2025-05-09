import { BaseClass, PageDto } from "@/type/tablePage.ts";

export class LogOperationDto extends BaseClass {
  id!: number;
  reqId!: string;
  callIp!: string;
  hostName!: string;
  perms!: string;
  userId!: string;
  loginRole!: string;
  authType!: string;
  reqParam!: string;
  oldValue!: string;
  operateType!: string;
  ifSuccess!: string;
  remark!: string;
}

export class LogOperationSelDto extends PageDto {
}

export class LogOperationSelAllDto {
}

export class LogOperationInsDto {
  reqId!: string;
  callIp!: string;
  hostName!: string;
  perms!: string;
  userId!: string;
  loginRole!: string;
  authType!: string;
  reqParam!: string;
  oldValue!: string;
  operateType!: string;
  ifSuccess!: string;
  remark!: string;
}

export class LogOperationUpdDto extends LogOperationInsDto {
  id!: number;
}
