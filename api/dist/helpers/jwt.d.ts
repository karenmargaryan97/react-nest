import { IUser } from '../guards/interfaces';
export declare const signJwt: (payload: IUser) => Promise<any>;
export declare const verifyJwt: (token: string) => Promise<IUser>;
