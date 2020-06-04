"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("../guards/auth-guard");
const swagger_1 = require("@nestjs/swagger");
exports.Auth = () => {
    return common_1.applyDecorators(common_1.UseGuards(auth_guard_1.AuthGuard), swagger_1.ApiBearerAuth(), swagger_1.ApiUnauthorizedResponse({ description: 'Unauthorized' }));
};
//# sourceMappingURL=auth-decorator.js.map