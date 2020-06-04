import { ValidationError, DatabaseError } from 'sequelize';
import { SequelizeException } from '../exceptions/sequelize-exception';
import { HttpStatus } from '@nestjs/common';
import { Exception } from '../exceptions/base-exception';
import { ValidationResultDto } from '../exceptions/dto/validation-result-dto';

export function throwException(
  exception: any,
  message = 'Exception',
  statusCode = HttpStatus.BAD_REQUEST,
  errors: ValidationResultDto[] = [],
) {
  console.error('[Error] Postgres: ', exception);
  if (exception instanceof ValidationError) {
    throw new SequelizeException('Sequelize Exception', HttpStatus.UNPROCESSABLE_ENTITY, exception.errors);
  }

  if (exception instanceof DatabaseError) {
    throw new SequelizeException('Something went wrong', HttpStatus.UNPROCESSABLE_ENTITY);
  }

  throw new Exception(exception.message, statusCode);
}
