"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SOMETHING_WENT_WRONG = exports.VALIDATION_ERROR = exports.required = exports.alreadyExists = exports.notFound = void 0;
exports.notFound = (resource) => `${resource} not found`;
exports.alreadyExists = (resource) => `${resource} already exists`;
exports.required = (resource) => `${resource} is required`;
exports.VALIDATION_ERROR = `Request didn't pass validation`;
exports.SOMETHING_WENT_WRONG = 'Something went wrong. Please try again later.';
//# sourceMappingURL=constants.js.map