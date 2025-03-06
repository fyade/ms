import { HttpException } from '@nestjs/common';

export class ForbiddenException extends HttpException {
  constructor(label?: string | null) {
    super(label ? `您无[${label}]接口权限。` : '您无权限。', 403);
  }
}
