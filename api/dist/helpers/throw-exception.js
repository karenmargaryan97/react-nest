"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.throwException = void 0;
const sequelize_1 = require("sequelize");
const sequelize_exception_1 = require("../exceptions/sequelize-exception");
const common_1 = require("@nestjs/common");
const base_exception_1 = require("../exceptions/base-exception");
function throwException(exception, message = 'Exception', statusCode = common_1.HttpStatus.BAD_REQUEST, errors = []) {
    console.error('[Error] Postgres: ', exception);
    if (exception instanceof sequelize_1.ValidationError) {
        throw new sequelize_exception_1.SequelizeException('Sequelize Exception', common_1.HttpStatus.UNPROCESSABLE_ENTITY, exception.errors);
    }
    if (exception instanceof sequelize_1.DatabaseError) {
        throw new sequelize_exception_1.SequelizeException('Something went wrong', common_1.HttpStatus.UNPROCESSABLE_ENTITY);
    }
    throw new base_exception_1.Exception(exception.message, statusCode);
}
exports.throwException = throwException;
//# sourceMappingURL=throw-exception.js.map