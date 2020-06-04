"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const common_1 = require("@nestjs/common");
const base_exception_1 = require("../exceptions/base-exception");
const jwt_1 = require("../helpers/jwt");
const userAuthDecorator = async (data, ctx) => {
    const { headers } = ctx.switchToHttp().getRequest();
    const token = headers['authorization'];
    if (!token) {
        throw new base_exception_1.Exception('Unauthorized', common_1.HttpStatus.UNAUTHORIZED);
    }
    return await jwt_1.verifyJwt(token);
};
exports.User = common_1.createParamDecorator(userAuthDecorator);
//# sourceMappingURL=auth-user-decorator.js.map