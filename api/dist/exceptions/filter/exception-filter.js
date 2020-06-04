"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
let HttpExceptionFilter = (() => {
    let HttpExceptionFilter = class HttpExceptionFilter {
        catch(exception, host) {
            const isNestException = exception instanceof common_1.HttpException;
            const ctx = host.switchToHttp();
            const response = ctx.getResponse();
            const request = ctx.getRequest();
            const statusCode = isNestException ? exception.getStatus() : common_1.HttpStatus.BAD_REQUEST;
            const errors = isNestException ? exception.getResponse() : [{ message: exception.message }];
            response
                .status(statusCode)
                .json({
                statusCode,
                errors,
                timestamp: new Date().toISOString(),
                path: request.url,
            });
        }
    };
    HttpExceptionFilter = __decorate([
        common_1.Catch(Error, common_1.HttpException)
    ], HttpExceptionFilter);
    return HttpExceptionFilter;
})();
exports.HttpExceptionFilter = HttpExceptionFilter;
//# sourceMappingURL=exception-filter.js.map