"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvironmentService = void 0;
const dotenv_1 = require("dotenv");
const constants_1 = require("../../config/constants");
class EnvironmentService {
    constructor() {
        dotenv_1.config();
    }
    verifyRequiredVariables(requiredVariables = constants_1.REQUIRED_VARIABLES) {
        for (const variable of requiredVariables) {
            if (!this.get(variable)) {
                return false;
            }
        }
        return true;
    }
    get(key) {
        return process.env[key];
    }
}
exports.EnvironmentService = EnvironmentService;
//# sourceMappingURL=environment-service.js.map