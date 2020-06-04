import { IDatabaseConfig } from './interfaces';
import { EnvironmentService } from '../modules/environment/environment-service';
import { Exception } from '../exceptions/base-exception';
import { HttpStatus } from '@nestjs/common';

let config;
const environmentService = new EnvironmentService();
const databaseConfig: IDatabaseConfig = {
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
      throw new Exception('Environment variables are missing', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    config = databaseConfig.production;
    break;
  case 'development':
  default:
    config = databaseConfig.development;
}

export { config };
