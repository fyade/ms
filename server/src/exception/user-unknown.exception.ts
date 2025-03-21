import { HttpException } from '@nestjs/common';

export class UserUnknownException extends HttpException {
  constructor() {
    super('用户不存在。', 501);
  }
}
