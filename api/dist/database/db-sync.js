"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_instance_1 = require("./sequelize-instance");
(async () => {
    try {
        const sequelize = await sequelize_instance_1.getSequelizeInstance();
        await sequelize.sync({
            force: false,
        });
        console.log(`Database synced`);
        process.exit(0);
    }
    catch (e) {
        console.error(e);
    }
})();
//# sourceMappingURL=db-sync.js.map