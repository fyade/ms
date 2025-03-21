import { BaseClass, PageDto } from "@/type/tablePage.ts";

export class OnlineUserDto extends BaseClass {
  id!: string;
  userid!: string;
  username!: string;
  loginRole!: string;
  loginTime!: string;
  loginIp!: string;
  loginOs!: string;
  loginBrowser!: string;
}

export class OnlineUserSelDto extends PageDto {
}

export class OnlineUserSelAllDto {
}

export class OnlineUserInsDto {
  userid!: string;
  username!: string;
  loginRole!: string;
  loginTime!: string;
  loginIp!: string;
  loginOs!: string;
  loginBrowser!: string;
}

export class OnlineUserUpdDto extends OnlineUserInsDto {
  id!: string;
}
