import { ArgumentsHost, Catch, ExceptionFilter, HttpException, BadRequestException } from '@nestjs/common';
import { UnknownException } from '../exception/unknown.exception';
import { BaseContextService } from '../module/base-context/base-context.service';
import { R } from '../common/R';
import { WinstonService } from '../module/winston/winston.service';
import { HTTP } from '../common/Enum';
import { baseUtils } from '@ms/common';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly bcs: BaseContextService,
    private readonly winston: WinstonService,
  ) {}

  catch(exception: HttpException | Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const reqId = this.bcs.getUserData().reqId;
    this.winston.error(reqId, exception);
    let status = 0;
    let message = '';
    if (exception instanceof BadRequestException) {
      const response1 = exception.getResponse() as {
        message: string[];
      };
      status = HTTP.SERVER_ERROR().code;
      message =
        response1.message
          .map((str) => {
            const match = str.match(/^items\.(\d+)\./);
            if (match) {
              return str.replace(`items.${match[1]}.`, `第${Number(match[1]) + 1}条数据的`);
            }
            return str;
          })
          .join('、') + '。';
    } else if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.message;
    } else if (['prismaclientvalidationerror'].includes(baseUtils.typeOf(exception))) {
      status = HTTP.SERVER_ERROR().code;
      message = '非正常请求。';
    } else {
      status = HTTP.SERVER_ERROR().code;
      message = exception.message;
    }
    try {
      response.status(status).json(new R(status, null, message, reqId));
    } catch (e) {
      const unknownException = new UnknownException(reqId, exception);
      response
        .status(unknownException.getStatus())
        .json(new R(unknownException.getStatus(), null, unknownException.getMessage(), reqId));
    }
  }
}
