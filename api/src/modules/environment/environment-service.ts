import { config } from 'dotenv';
import { REQUIRED_VARIABLES } from '../../config/constants';

export class EnvironmentService {
  constructor() {
    config();
  }

  verifyRequiredVariables(requiredVariables: string[] = REQUIRED_VARIABLES): boolean {
    for (const variable of requiredVariables) {
      if (!this.get(variable)) {
        return false;
      }
    }

    return true;
  }

  get(key: string): string {
    return process.env[key];
  }
}