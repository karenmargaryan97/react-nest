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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const abstract_service_1 = require("../../services/abstract-service");
const database_constants_1 = require("../../database/database-constants");
const base_exception_1 = require("../../exceptions/base-exception");
const constants_1 = require("../../exceptions/constants");
const auth_1 = require("../../helpers/auth");
const jwt_1 = require("../../helpers/jwt");
let UserService = (() => {
    let UserService = class UserService extends abstract_service_1.AbstractService {
        constructor(userRepository) {
            super(userRepository);
            this.userRepository = userRepository;
        }
        async signup({ email, password }) {
            const existingUser = await this.get({ where: { email, password } });
            if (existingUser) {
                throw new base_exception_1.Exception(constants_1.alreadyExists('User'));
            }
            const hash = await auth_1.genPassword(password);
            const user = await this.create({ email, password: hash }, { email });
            const accessToken = await jwt_1.signJwt({ uid: user.id });
            return { accessToken };
        }
        async login({ email, password }) {
            const user = await this.get({ where: { email } });
            if (!user) {
                throw new base_exception_1.Exception(constants_1.notFound('User'), common_1.HttpStatus.NOT_FOUND);
            }
            const isValidPass = await auth_1.checkPassword(password, user.password);
            if (!isValidPass) {
                throw new base_exception_1.Exception('Invalid email or password', common_1.HttpStatus.BAD_REQUEST);
            }
            const accessToken = await jwt_1.signJwt({ uid: user.id });
            return { accessToken };
        }
        async getUser(id) {
            const user = await this.get({ where: { id } });
            if (!user) {
                throw new base_exception_1.Exception(constants_1.notFound('User'), common_1.HttpStatus.NOT_FOUND);
            }
            return {
                id: user.id,
                email: user.email,
            };
        }
    };
    UserService = __decorate([
        common_1.Injectable(),
        __param(0, common_1.Inject(database_constants_1.USER_REPOSITORY)),
        __metadata("design:paramtypes", [Object])
    ], UserService);
    return UserService;
})();
exports.UserService = UserService;
//# sourceMappingURL=user-service.js.map