"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SequelizeException = void 0;
const convert_error_response_1 = require("../helpers/convert-error-response");
const base_exception_1 = require("./base-exception");
class SequelizeException extends base_exception_1.Exception {
    constructor(message, status, errors = []) {
        super(message, status);
        this.errors = convert_error_response_1.transformSequelizeErrors(errors);
    }
    getResponse() {
        return this.errors;
    }
}
exports.SequelizeException = SequelizeException;
//# sourceMappingURL=sequelize-exception.js.map