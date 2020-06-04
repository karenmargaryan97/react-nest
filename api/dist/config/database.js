"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const environment_service_1 = require("../modules/environment/environment-service");
const base_exception_1 = require("../exceptions/base-exception");
const common_1 = require("@nestjs/common");
let config;
exports.config = config;
const environmentService = new environment_service_1.EnvironmentService();
const databaseConfig = {
    development: {
        username: environmentService.get('POSTGRES_USER'),
        password: environmentService.get('POSTGRES_PASSWORD'),
        database: environmentService.get('POSTGRES_DB'),
        host: environmentService.get('POSTGRES_HOST'),
        port: Number(environmentService.get('POSTGRES_PORT')) || 5432,
        dialect: 'postgres',
        logging: console.log,
        pool: {
            max: 10,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
    },
    production: {
        username: environmentService.get('POSTGRES_USER'),
        password: environmentService.get('POSTGRES_PASSWORD'),
        database: environmentService.get('POSTGRES_DB'),
        host: environmentService.get('POSTGRES_HOST'),
        port: Number(environmentService.get('POSTGRES_PORT')) || 5432,
        dialect: 'postgres',
        logging: false,
        pool: {
            max: 10,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
    },
};
switch (process.env.NODE_ENV) {
    case 'production':
        if (!environmentService.verifyRequiredVariables()) {
            throw new base_exception_1.Exception('Environment variables are missing', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        exports.config = config = databaseConfig.production;
        break;
    case 'development':
    default:
        exports.config = config = databaseConfig.development;
}
//# sourceMappingURL=database.js.map