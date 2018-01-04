import * as Raven from 'raven';
import { ExceptionFilter, Catch } from '@nestjs/common';
import { HttpException } from '@nestjs/core';

@Catch(HttpException, Error)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(err, res) {
    let code, message;

    if (err instanceof HttpException) {
      code = err.getStatus();
      message = err.getResponse();
    } else {
      code = 500;
      message = err.message;

      Raven.captureException(err);
    }

    res.set('multiple-login', code === 200);

    return res.status(code).json({
      code,
      status: false,
      message,
      data: {},
    });
  }
}