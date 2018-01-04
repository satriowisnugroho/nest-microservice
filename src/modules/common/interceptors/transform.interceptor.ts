import { Interceptor, NestInterceptor, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Interceptor()
export class TransformInterceptor implements NestInterceptor {
  intercept(dataOrRequest, context: ExecutionContext, stream$: Observable<any>): Observable<any> {
    return stream$.map((res = {}) => {
      const code = dataOrRequest.res.statusCode;
      const {
        status = true,
        message = 'Success',
        data = {},
        meta,
      } = res;

      dataOrRequest.res.set('multiple-login', false);

      return {
        code,
        status,
        message,
        meta,
        data,
      };
    });
  }
}