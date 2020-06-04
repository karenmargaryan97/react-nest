import { HttpStatus } from '@nestjs/common';
import { ValidationResultDto } from '../exceptions/dto/validation-result-dto';
export declare function throwException(exception: any, message?: string, statusCode?: HttpStatus, errors?: ValidationResultDto[]): void;
