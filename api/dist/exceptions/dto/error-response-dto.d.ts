import { ValidationResultDto } from './validation-result-dto';
export declare class ErrorResponseDto {
    readonly errors: ValidationResultDto[];
    readonly path: string;
    readonly statusCode: number;
    readonly timestamp: string;
}
