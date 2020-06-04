import { Model } from 'sequelize-typescript';
export declare class User extends Model<User> {
    id: string;
    email: string;
    password: string;
}
