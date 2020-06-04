"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseService = void 0;
const common_1 = require("@nestjs/common");
const MigrationService = require("umzug");
const database_constants_1 = require("../../database/database-constants");
const sequelize_typescript_1 = require("sequelize-typescript");
let DatabaseService = (() => {
    let DatabaseService = class DatabaseService {
        constructor(sequelizeInstance) {
            this.sequelizeInstance = sequelizeInstance;
            this.migrationService = new MigrationService({
                storage: database_constants_1.SEQUELIZE,
                storageOptions: { sequelize: sequelizeInstance },
                migrations: {
                    path: 'data/migrations',
                    params: [sequelizeInstance.getQueryInterface()],
                },
            });
        }
        async getPendingMigrations() {
            return await this.migrationService.pending();
        }
        async executePendingMigrations() {
            var e_1, _a;
            await this.sequelizeInstance.sync({ force: false });
            const pendingMigrations = await this.getPendingMigrations();
            if (!pendingMigrations.length) {
                return;
            }
            try {
                for (var pendingMigrations_1 = __asyncValues(pendingMigrations), pendingMigrations_1_1; pendingMigrations_1_1 = await pendingMigrations_1.next(), !pendingMigrations_1_1.done;) {
                    const migration = pendingMigrations_1_1.value;
                    try {
                        await this.migrationService.up(migration.file);
                    }
                    catch (e) {
                        await this.migrationService.down(migration.file);
                        process.exit(42);
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (pendingMigrations_1_1 && !pendingMigrations_1_1.done && (_a = pendingMigrations_1.return)) await _a.call(pendingMigrations_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
    };
    DatabaseService = __decorate([
        common_1.Injectable(),
        __param(0, common_1.Inject(database_constants_1.SEQUELIZE)),
        __metadata("design:paramtypes", [sequelize_typescript_1.Sequelize])
    ], DatabaseService);
    return DatabaseService;
})();
exports.DatabaseService = DatabaseService;
//# sourceMappingURL=database-service.js.map