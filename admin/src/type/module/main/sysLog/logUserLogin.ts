import { BaseClass, PageDto } from "@/type/tablePage.ts";

export class LogUserLoginDto extends BaseClass {
  id!: number;
  userId!: string;
  loginRole!: string;
  loginIp!: string;
  loginPosition!: string;
  loginBrowser!: string;
  loginOs!: string;
  ifSuccess!: string;
  failType!: string;
  remark!: string;
}

export class LogUserLoginSelDto extends PageDto {
}

export class LogUserLoginSelAllDto {
}

export class LogUserLoginInsDto {
  userId!: string;
  loginRole!: string;
  loginIp!: string;
  loginPosition!: string;
  loginBrowser!: string;
  loginOs!: string;
  ifSuccess!: string;
  failType!: string;
  remark!: string;
}

export class LogUserLoginUpdDto extends LogUserLoginInsDto {
  id!: number;
}
