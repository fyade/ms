import { HttpException } from '@nestjs/common';

export class Exception extends HttpException {
  constructor(msg: string, code: number = 501) {
    super(msg, code);
  }
}
