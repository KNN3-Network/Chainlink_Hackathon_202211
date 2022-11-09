import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { HttpException, InternalServerErrorException } from '@nestjs/common';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const { status, json } = this.prepareException(exception);

    const data = {
      code: status,
      message: json.message,
      error: json.error,
    };
    response.status(status).send(data);
  }

  prepareException(exc: any): { status: number; json: any } {
    if (process.env.NODE_ENV !== 'test') {
      console.log(exc);
    }

    const error =
      exc instanceof HttpException
        ? exc
        : new InternalServerErrorException(exc.message);
    const status = error.getStatus();
    const response = error.getResponse();
    const json = typeof response === 'string' ? { error: response } : response;

    return { status, json };
  }
}
