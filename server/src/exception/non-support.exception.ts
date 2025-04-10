import { HttpException } from '@nestjs/common';

export class NonSupportException extends HttpException {
  constructor(operationName = '此操作') {
    super(`当前环境不支持${operationName}。`, 500);
  }
}
