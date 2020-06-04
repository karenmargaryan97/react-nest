import { Inject, Injectable } from '@nestjs/common';
import * as MigrationService from 'umzug';
import { SEQUELIZE } from '../../database/database-constants';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class DatabaseService {
  constructor(@Inject(SEQUELIZE) private readonly sequelizeInstance: Sequelize) {
    this.migrationService = new MigrationService({
      storage: SEQUELIZE,
      storageOptions: { sequelize: sequelizeInstance },
      migrations: {
        path: 'data/migrations',
        params: [sequelizeInstance.getQueryInterface()],
      },
    });
  }

  private readonly migrationService: MigrationService.Umzug;

  async getPendingMigrations() {
    return await this.migrationService.pending();
  }

  async executePendingMigrations() {
    await this.sequelizeInstance.sync({ force: false });
    const pendingMigrations = await this.getPendingMigrations();
    if (!pendingMigrations.length) {
      return;
    }

    for await (const migration of pendingMigrations) {
      try {
        await this.migrationService.up(migration.file);
      } catch (e) {
        await this.migrationService.down(migration.file);
        process.exit(42);
      }
    }
  }
}
