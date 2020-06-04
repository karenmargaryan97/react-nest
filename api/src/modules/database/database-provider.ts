import { Provider } from '@nestjs/common';
import { SEQUELIZE } from '../../database/database-constants';
import { getSequelizeInstance } from '../../database/sequelize-instance';

export const DatabaseProvider: Provider = {
  provide: SEQUELIZE,
  useFactory: getSequelizeInstance,
};
