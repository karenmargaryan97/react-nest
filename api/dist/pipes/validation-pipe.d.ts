import { PipeTransform, ArgumentMetadata } from '@nestjs/common';
export declare class ValidationPipe implements PipeTransform {
    transform(value: any, { metatype }: ArgumentMetadata): Promise<any>;
    private static toValidate;
}
