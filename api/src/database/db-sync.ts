import { Sequelize } from 'sequelize-typescript';
import { getSequelizeInstance } from './sequelize-instance';

(async () => {
  try {
    const sequelize: Sequelize = await getSequelizeInstance();
    await sequelize.sync({
      force: false,
    });
    console.log(`Database synced`);
    process.exit(0);
  } catch (e) {
    console.error(e);
  }
})();
