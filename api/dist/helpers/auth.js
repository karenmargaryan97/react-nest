"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPassword = exports.genPassword = exports.hashPassword = exports.genSalt = void 0;
const bcrypt = require("bcryptjs");
exports.genSalt = async (saltRounds) => {
    return bcrypt.genSalt(saltRounds);
};
exports.hashPassword = async (password, salt) => {
    return bcrypt.hash(password, salt);
};
exports.genPassword = async (password) => {
    const saltRounds = 10;
    const salt = await exports.genSalt(saltRounds);
    return exports.hashPassword(password, salt);
};
exports.checkPassword = async (password, hash) => {
    return bcrypt.compare(password, hash);
};
//# sourceMappingURL=auth.js.map