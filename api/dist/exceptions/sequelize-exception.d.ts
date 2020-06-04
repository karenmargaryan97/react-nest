import { HttpStatus } from '@nestjs/common';
import { ValidationResultDto } from './dto/validation-result-dto';
import { ValidationErrorItem } from 'sequelize';
import { Exception } from './base-exception';
export declare class SequelizeException extends Exception {
    errors: ValidationResultDto[];
    readonly statusCode: HttpStatus.UNPROCESSABLE_ENTITY;
    constructor(message: string, status: number, errors?: ValidationErrorItem[]);
    getResponse(): ValidationResultDto[];
}
