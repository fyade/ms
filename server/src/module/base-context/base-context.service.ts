import { Injectable } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import { CurrentUser, FieldSelectParam, genCurrentUser, USER_INFO_LINSHI_FIELD_NAME } from './baseContext';
import { AuthTypeEnum } from '../../util/base';

@Injectable()
export class BaseContextService {
  constructor(private readonly cls: ClsService) {
  }

  getUserData(): CurrentUser {
    const header = this.cls.get(USER_INFO_LINSHI_FIELD_NAME);
    if (header) {
      return header;
    }
    const currentUser = genCurrentUser();
    this.setUserData(currentUser);
    return currentUser;
  }

  setUserData(userData: CurrentUser) {
    this.cls.set(USER_INFO_LINSHI_FIELD_NAME, userData);
  }

  setUserToTopAdmin() {
    const userData = this.getUserData();
    userData.topAdmin = true;
    this.setUserData(userData);
  }

  setUserAuthType(authType: AuthTypeEnum) {
    const userData = this.getUserData();
    userData.authType = authType;
    this.setUserData(userData);
  }

  private fieldSelectParam: Record<string, FieldSelectParam> = {};

  setFieldSelectParam(tableName: string, param: Partial<FieldSelectParam>) {
    this.fieldSelectParam[tableName] = new FieldSelectParam(param);
  }

  getFieldSelectParam(tableName: string) {
    const fsp = this.fieldSelectParam[tableName];
    if (fsp) {
      return fsp;
    }
    return new FieldSelectParam();
  }
}
