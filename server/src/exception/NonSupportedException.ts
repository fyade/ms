import { HttpException } from '@nestjs/common';

export class NonSupportedException extends HttpException {
  constructor(operationName = '此操作') {
    super(`当前环境不支持${operationName}。`, 501);
  }
}
