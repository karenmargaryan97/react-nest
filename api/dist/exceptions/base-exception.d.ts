import { HttpException, HttpStatus } from '@nestjs/common';
import { ValidationResultDto } from './dto/validation-result-dto';
export declare class Exception extends HttpException {
    readonly errors: ValidationResultDto[];
    constructor(message: string, status?: HttpStatus, errors?: ValidationResultDto[]);
    getResponse(): ValidationResultDto[];
}
