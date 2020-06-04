"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformSequelizeErrors = exports.transformValidatorErrors = void 0;
exports.transformValidatorErrors = (errors) => {
    if (!errors.length) {
        return [];
    }
    return errors.map(err => {
        return {
            message: Object.keys(err.constraints).length && Object.values(err.constraints)[0],
            property: err.property,
            value: err.value,
        };
    });
};
exports.transformSequelizeErrors = (errors) => {
    if (!errors.length) {
        return [];
    }
    return errors.map(err => {
        return {
            message: err.message,
            property: err.path,
            value: err.value,
        };
    });
};
//# sourceMappingURL=convert-error-response.js.map