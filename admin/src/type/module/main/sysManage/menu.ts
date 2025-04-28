import { BaseClass, PageDto } from "@/type/tablePage.ts";
import { MenuTypeEnum } from "@/utils/base.ts";

export class MenuDto<T = MenuTypeEnum> extends BaseClass {
  id!: number;
  label!: string;
  type!: T;
  path!: string;
  parentId!: number;
  component!: string;
  icon!: string;
  orderNum!: number;
  ifLink!: string;
  ifVisible!: string;
  ifDisabled!: string;
  ifPublic!: string;
  ifFixed!: string;
  perms!: string;
  sysId!: number;
  remark!: string;
}

export class MenuSelDto extends PageDto {
}

export class MenuSelAllDto {
}

export class MenuInsDto<T = MenuTypeEnum> {
  label!: string;
  type!: T;
  path!: string;
  parentId!: number;
  component!: string;
  icon!: string;
  orderNum!: number;
  ifLink!: string;
  ifVisible!: string;
  ifDisabled!: string;
  ifPublic!: string;
  ifFixed!: string;
  perms!: string;
  sysId!: number;
  remark!: string;
}

export class MenuUpdDto<T = MenuTypeEnum> extends MenuInsDto<T> {
  id!: number;
}
