import { Sequelize } from 'sequelize-typescript';
import { User } from '../modules/user/user-entity';
import { config } from '../config/database';

export const getSequelizeInstance = () => {
  const sequelize = new Sequelize(config);
  sequelize.addModels([User]);

  return sequelize;
};
