import { HttpException, HttpStatus } from '@nestjs/common';
import { ValidationResultDto } from './dto/validation-result-dto';

export class Exception extends HttpException {
  readonly errors: ValidationResultDto[];

  constructor(message: string, status = HttpStatus.BAD_REQUEST, errors: ValidationResultDto[] = []) {
    super(message, status);
    if (!errors.length) {
      this.errors = [{ message }];
    } else {
      this.errors = errors;
    }
  }

  getResponse(): ValidationResultDto[] {
    return this.errors;
  }
}
