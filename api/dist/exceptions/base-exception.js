"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Exception = void 0;
const common_1 = require("@nestjs/common");
class Exception extends common_1.HttpException {
    constructor(message, status = common_1.HttpStatus.BAD_REQUEST, errors = []) {
        super(message, status);
        if (!errors.length) {
            this.errors = [{ message }];
        }
        else {
            this.errors = errors;
        }
    }
    getResponse() {
        return this.errors;
    }
}
exports.Exception = Exception;
//# sourceMappingURL=base-exception.js.map