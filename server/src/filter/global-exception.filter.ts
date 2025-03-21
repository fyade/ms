import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Injectable } from '@nestjs/common';
import { UnknownException } from '../exception/unknown.exception';
import { Request } from 'express';
import { BaseContextService } from '../module/base-context/base-context.service';
import { R } from '../common/R';
import { WinstonService } from "../module/winston/winston.service";

@Catch()
@Injectable()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly bcs: BaseContextService,
    private readonly winston: WinstonService,
  ) {
  }

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request: Request = ctx.getRequest();
    const reqId = this.bcs.getUserData().reqId;
    this.winston.error(reqId, exception)
    try {
      response.status(exception.getStatus()).json(new R(exception.getStatus(), null, exception.message, reqId));
    } catch (e) {
      const unknownException = new UnknownException(reqId, exception);
      response.status(unknownException.getStatus()).json(new R(unknownException.getStatus(), null, unknownException.getMessage(), reqId));
    }
  }
}
