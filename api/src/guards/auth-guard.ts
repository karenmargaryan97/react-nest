import { Injectable, CanActivate, ExecutionContext, HttpStatus } from '@nestjs/common';
import { Exception } from '../exceptions/base-exception';
import { Request } from 'express';
import { verifyJwt } from '../helpers/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token = request.headers['authorization'];

    if (!token) {
      throw new Exception('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    const user = await verifyJwt(token);
    if (!user) {
      throw new Exception('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    return true;
  }
}
