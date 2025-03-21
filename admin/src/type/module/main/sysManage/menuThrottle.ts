import { BaseClass, PageDto } from "@/type/tablePage.ts";

export class MenuThrottleDto extends BaseClass {
  id!: number;
  menuId!: number;
  ttl!: number;
  limit!: number;
  type!: string;
  remark!: string;
}

export class MenuThrottleSelDto extends PageDto {
}

export class MenuThrottleSelAllDto {
}

export class MenuThrottleInsDto {
  menuId!: number;
  ttl!: number;
  limit!: number;
  type!: string;
  remark!: string;
}

export class MenuThrottleUpdDto extends MenuThrottleInsDto {
  id!: number;
}
