import { PipeTransform, Injectable, ArgumentMetadata, HttpStatus } from '@nestjs/common';
import { validate, ValidationError } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { Exception } from '../exceptions/base-exception';
import { transformValidatorErrors } from '../helpers/convert-error-response';
import { VALIDATION_ERROR } from '../exceptions/constants';

@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !ValidationPipe.toValidate(metatype)) {
      return value;
    }

    const object = plainToClass(metatype, value);

    const errors: ValidationError[] = await validate(object);
    if (errors.length) {
      throw new Exception(VALIDATION_ERROR, HttpStatus.UNPROCESSABLE_ENTITY, transformValidatorErrors(errors));
    }

    return object;
  }

  private static toValidate(metaType: any): boolean {
    return ![String, Boolean, Number, Array, Object].includes(metaType);
  }
}
