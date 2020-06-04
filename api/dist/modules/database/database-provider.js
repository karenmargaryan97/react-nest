"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseProvider = void 0;
const database_constants_1 = require("../../database/database-constants");
const sequelize_instance_1 = require("../../database/sequelize-instance");
exports.DatabaseProvider = {
    provide: database_constants_1.SEQUELIZE,
    useFactory: sequelize_instance_1.getSequelizeInstance,
};
//# sourceMappingURL=database-provider.js.map