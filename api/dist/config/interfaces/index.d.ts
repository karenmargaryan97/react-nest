export interface IDatabaseConfigAttributes {
    username: string;
    password: string;
    database: string;
    host: string;
    port: number;
    dialect: string;
    logging?: boolean | (() => void);
    force?: boolean;
    timezone?: string;
    pool?: IPoolOptions;
}
interface IPoolOptions {
    max?: number;
    min?: number;
    acquire?: number;
    idle?: number;
}
export interface IDatabaseConfig {
    development: IDatabaseConfigAttributes;
    production?: IDatabaseConfigAttributes;
}
export {};
