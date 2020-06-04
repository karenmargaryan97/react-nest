"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSequelizeInstance = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const user_entity_1 = require("../modules/user/user-entity");
const database_1 = require("../config/database");
exports.getSequelizeInstance = () => {
    const sequelize = new sequelize_typescript_1.Sequelize(database_1.config);
    sequelize.addModels([user_entity_1.User]);
    return sequelize;
};
//# sourceMappingURL=sequelize-instance.js.map