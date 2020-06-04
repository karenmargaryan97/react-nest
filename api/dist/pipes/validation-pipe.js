"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationPipe = void 0;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const base_exception_1 = require("../exceptions/base-exception");
const convert_error_response_1 = require("../helpers/convert-error-response");
const constants_1 = require("../exceptions/constants");
let ValidationPipe = (() => {
    var ValidationPipe_1;
    let ValidationPipe = ValidationPipe_1 = class ValidationPipe {
        async transform(value, { metatype }) {
            if (!metatype || !ValidationPipe_1.toValidate(metatype)) {
                return value;
            }
            const object = class_transformer_1.plainToClass(metatype, value);
            const errors = await class_validator_1.validate(object);
            if (errors.length) {
                throw new base_exception_1.Exception(constants_1.VALIDATION_ERROR, common_1.HttpStatus.UNPROCESSABLE_ENTITY, convert_error_response_1.transformValidatorErrors(errors));
            }
            return object;
        }
        static toValidate(metaType) {
            return ![String, Boolean, Number, Array, Object].includes(metaType);
        }
    };
    ValidationPipe = ValidationPipe_1 = __decorate([
        common_1.Injectable()
    ], ValidationPipe);
    return ValidationPipe;
})();
exports.ValidationPipe = ValidationPipe;
//# sourceMappingURL=validation-pipe.js.map