/**
 * Transform interceptor.
 * @file 请求流拦截器
 * @module interceptor/transform
 */

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  Injectable,
  NestInterceptor,
  CallHandler,
  ExecutionContext,
} from '@nestjs/common';
import { THttpSuccessResponse } from '../interface';

/**
 * @class TransformInterceptor
 * @classdesc 当控制器所需的 Promise service 成功响应时，将在此被转换为标准的数据结构 IHttpResultPaginate
 */
@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, THttpSuccessResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<THttpSuccessResponse<T>> {
    const [req] = context.getArgs();

    // text/event-stream
    if (req?.headers?.accept === 'text/event-stream') return next.handle();

    return next.handle().pipe(
      map((data) => ({
        code: 200,
        message: '',
        result: data,
      })),
    );
  }
}
