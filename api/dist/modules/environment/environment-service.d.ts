export declare class EnvironmentService {
    constructor();
    verifyRequiredVariables(requiredVariables?: string[]): boolean;
    get(key: string): string;
}
