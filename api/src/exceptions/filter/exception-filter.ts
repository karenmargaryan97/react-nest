import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(Error, HttpException)
export class HttpExceptionFilter<T extends HttpException> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost): void {
    const isNestException = exception instanceof HttpException;
    const ctx = host.switchToHttp();
    const response: Response = ctx.getResponse<Response>();
    const request: Request = ctx.getRequest<Request>();
    const statusCode: number = isNestException ? exception.getStatus() : HttpStatus.BAD_REQUEST;
    const errors = isNestException ? exception.getResponse() : [{ message: exception.message }];

    response
      .status(statusCode)
      .json({
        statusCode,
        errors,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
  }
}
