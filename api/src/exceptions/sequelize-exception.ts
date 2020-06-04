import { HttpStatus } from '@nestjs/common';
import { ValidationResultDto } from './dto/validation-result-dto';
import { ValidationErrorItem } from 'sequelize';
import { transformSequelizeErrors } from '../helpers/convert-error-response';
import { Exception } from './base-exception';

export class SequelizeException extends Exception {
  errors: ValidationResultDto[];
  readonly statusCode: HttpStatus.UNPROCESSABLE_ENTITY;

  constructor(message: string, status: number, errors: ValidationErrorItem[] = []) {
    super(message, status);
    this.errors = transformSequelizeErrors(errors);
  }

  getResponse(): ValidationResultDto[] {
    return this.errors;
  }
}
