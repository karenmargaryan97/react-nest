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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractService = void 0;
const throw_exception_1 = require("../helpers/throw-exception");
const common_1 = require("@nestjs/common");
const base_exception_1 = require("../exceptions/base-exception");
const constants_1 = require("../exceptions/constants");
let AbstractService = (() => {
    let AbstractService = class AbstractService {
        constructor(repository) {
            this.repository = repository;
        }
        async getAll({ where = {}, order = [], attributes = null, offset = 0, limit = 20, raw = false, } = {}, include = []) {
            try {
                return this.repository.findAll({
                    where,
                    order,
                    attributes,
                    offset,
                    limit,
                    include,
                    raw,
                });
            }
            catch (e) {
                console.error(`Error: CRUD service - ${this.repository.name}[getAll]: `, e);
                throw_exception_1.throwException(e);
            }
        }
        async get({ where = {}, attributes = null, } = {}, include = []) {
            try {
                return await this.repository.findOne({
                    where,
                    attributes,
                    include,
                });
            }
            catch (e) {
                console.error(`Error: CRUD service - ${this.repository.name}[get]: `, e);
                throw_exception_1.throwException(e);
            }
        }
        async create(entity, where = {}, transaction) {
            try {
                const options = {
                    where,
                    defaults: entity,
                };
                if (transaction) {
                    options.transaction = transaction;
                }
                const [instance, created] = await this.repository.findOrCreate(options);
                if (!created) {
                    throw new base_exception_1.Exception(constants_1.alreadyExists(`${this.repository.name} with id: ${instance.id}`));
                }
                return instance;
            }
            catch (e) {
                console.error(`Error: CRUD service - ${this.repository.name}[create]: `, e);
                throw_exception_1.throwException(e);
            }
        }
        async update(id, values, transaction) {
            try {
                const options = {
                    where: { id },
                    returning: true,
                };
                if (transaction) {
                    options.transaction = transaction;
                }
                const [updated, [instance]] = await this.repository.update(values, options);
                if (!updated) {
                    throw new base_exception_1.Exception('Update error', common_1.HttpStatus.BAD_REQUEST);
                }
                return instance;
            }
            catch (e) {
                console.error(`Error: CRUD service - ${this.repository.name}[update]: `, e);
                throw_exception_1.throwException(e);
            }
        }
        async delete({ where = {} }, transaction) {
            try {
                const options = { where };
                if (transaction) {
                    options.transaction = transaction;
                }
                await this.repository.destroy(options);
            }
            catch (e) {
                console.error(`Error: CRUD service - ${this.repository.name}[delete]: `, e);
                throw_exception_1.throwException(e);
            }
        }
    };
    AbstractService = __decorate([
        common_1.Injectable(),
        __metadata("design:paramtypes", [Object])
    ], AbstractService);
    return AbstractService;
})();
exports.AbstractService = AbstractService;
//# sourceMappingURL=abstract-service.js.map