import { BaseClass, PageDto } from "@/type/tablePage.ts";

export class LogAlgorithmCallDto extends BaseClass {
  id!: number;
  userGroupPermissionId!: number;
  pperms!: string;
  perms!: string;
  userId!: string;
  loginRole!: string;
  callIp!: string;
  ifSuccess!: string;
  remark!: string;
}

export class LogAlgorithmCallSelDto extends PageDto {
}

export class LogAlgorithmCallSelAllDto {
}

export class LogAlgorithmCallInsDto {
  userGroupPermissionId!: number;
  pperms!: string;
  perms!: string;
  userId!: string;
  loginRole!: string;
  callIp!: string;
  ifSuccess!: string;
  remark!: string;
}

export class LogAlgorithmCallUpdDto extends LogAlgorithmCallInsDto {
  id!: number;
}
