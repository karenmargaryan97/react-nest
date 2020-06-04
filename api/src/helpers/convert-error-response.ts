import { ValidationResultDto } from '../exceptions/dto/validation-result-dto';
import { ValidationErrorItem } from 'sequelize';
import { ValidationError } from 'class-validator';

export const transformValidatorErrors = (errors: ValidationError[]): ValidationResultDto[] => {
  if (!errors.length) {
    return [];
  }

  return errors.map(err => {
    return {
      message: Object.keys(err.constraints).length && Object.values(err.constraints)[0],
      property: err.property,
      value: err.value,
    };
  });
};

export const transformSequelizeErrors = (errors: ValidationErrorItem[]): ValidationResultDto[] => {
  if (!errors.length) {
    return [];
  }

  return errors.map(err => {
    return {
      message: err.message,
      property: err.path,
      value: err.value,
    };
  });
};
