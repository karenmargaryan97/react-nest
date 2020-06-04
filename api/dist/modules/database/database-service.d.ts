import { Sequelize } from 'sequelize-typescript';
export declare class DatabaseService {
    private readonly sequelizeInstance;
    constructor(sequelizeInstance: Sequelize);
    private readonly migrationService;
    getPendingMigrations(): Promise<any>;
    executePendingMigrations(): Promise<void>;
}
