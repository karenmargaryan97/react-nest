import { createParamDecorator, ExecutionContext, HttpStatus } from '@nestjs/common';
import { Exception } from '../exceptions/base-exception';
import { verifyJwt } from '../helpers/jwt';
import { IUser } from '../guards/interfaces';
import { Request } from 'express';

const userAuthDecorator = async (data: unknown, ctx: ExecutionContext): Promise<IUser> => {
  const { headers }: Request = ctx.switchToHttp().getRequest();
  const token = headers['authorization'];
  if (!token) {
    throw new Exception('Unauthorized', HttpStatus.UNAUTHORIZED);
  }

  return await verifyJwt(token);
};

export const User = createParamDecorator(userAuthDecorator);
