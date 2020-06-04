"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJwt = exports.signJwt = void 0;
const environment_service_1 = require("../modules/environment/environment-service");
const jsonwebtoken_1 = require("jsonwebtoken");
const environmentService = new environment_service_1.EnvironmentService();
exports.signJwt = async (payload) => {
    return jsonwebtoken_1.sign(payload, environmentService.get('JWT_SECRET'));
};
exports.verifyJwt = async (token) => {
    try {
        const verified = await jsonwebtoken_1.verify(token, environmentService.get('JWT_SECRET'));
        return verified;
    }
    catch (e) {
        return null;
    }
};
//# sourceMappingURL=jwt.js.map