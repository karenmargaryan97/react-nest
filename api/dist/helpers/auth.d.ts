export declare const genSalt: (saltRounds: number) => Promise<any>;
export declare const hashPassword: (password: string, salt: number) => Promise<string>;
export declare const genPassword: (password: string) => Promise<string>;
export declare const checkPassword: (password: string, hash: string) => Promise<boolean>;
