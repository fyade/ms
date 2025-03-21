import { BaseClass, PageDto } from "@/type/tablePage.ts";

export class SysConfigDto extends BaseClass {
  id!: number;
  ifAllowUserRegist!: string;
  remark!: string;
}

export class SysConfigSelDto extends PageDto {
}

export class SysConfigSelAllDto {
}

export class SysConfigInsDto {
  ifAllowUserRegist!: string;
  remark!: string;
}

export class SysConfigUpdDto extends SysConfigInsDto {
  id!: number;
}
