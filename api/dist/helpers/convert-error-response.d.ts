import { ValidationResultDto } from '../exceptions/dto/validation-result-dto';
import { ValidationErrorItem } from 'sequelize';
import { ValidationError } from 'class-validator';
export declare const transformValidatorErrors: (errors: ValidationError[]) => ValidationResultDto[];
export declare const transformSequelizeErrors: (errors: ValidationErrorItem[]) => ValidationResultDto[];
