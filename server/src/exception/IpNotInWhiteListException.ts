import { HttpException } from '@nestjs/common';

export class IpNotInWhiteListException extends HttpException {
  constructor() {
    super('请求源IP不在白名单内。', 501);
  }
}
