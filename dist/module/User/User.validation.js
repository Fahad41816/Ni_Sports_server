"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserLoginValidationWithZod = exports.UserValidationWithZod = void 0;
const zod_1 = require("zod");
exports.UserValidationWithZod = zod_1.z.object({
    name: zod_1.z.string(),
    address: zod_1.z.string(),
    email: zod_1.z.string(),
    password: zod_1.z.string(),
    phone: zod_1.z.string(),
});
exports.UserLoginValidationWithZod = zod_1.z.object({
    email: zod_1.z.string(),
    password: zod_1.z.string(),
});
