import { BaseClass, PageDto } from "@/type/tablePage.ts";

export class UserApiKeyDto extends BaseClass {
  id!: number;
  userId!: string;
  userRole!: string;
  apiKey!: string;
  remark!: string;
}

export class UserApiKeySelDto extends PageDto {
}

export class UserApiKeySelAllDto {
}

export class UserApiKeyInsDto {
  userId!: string;
  userRole!: string;
  apiKey!: string;
  remark!: string;
}

export class UserApiKeyUpdDto extends UserApiKeyInsDto {
  id!: number;
}
