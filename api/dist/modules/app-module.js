"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const environment_module_1 = require("./environment/environment-module");
const database_module_1 = require("./database/database.module");
const user_module_1 = require("./user/user-module");
let AppModule = (() => {
    let AppModule = class AppModule {
    };
    AppModule = __decorate([
        common_1.Module({
            imports: [
                database_module_1.DatabaseModule,
                environment_module_1.EnvironmentModule,
                user_module_1.UserModule,
            ],
        })
    ], AppModule);
    return AppModule;
})();
exports.AppModule = AppModule;
//# sourceMappingURL=app-module.js.map