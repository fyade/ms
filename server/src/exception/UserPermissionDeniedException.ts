import { HttpException } from '@nestjs/common';

export class UserPermissionDeniedException extends HttpException {
  constructor() {
    super('权限不足。', 501);
  }
}
