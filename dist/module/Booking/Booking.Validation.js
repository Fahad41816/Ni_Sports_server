"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingValidate = void 0;
const zod_1 = require("zod");
const BookingValidationWithZod = zod_1.z.object({
    date: zod_1.z.string(),
    startTime: zod_1.z.string(),
    endTime: zod_1.z.string(),
    facility: zod_1.z.string(),
    payableAmount: zod_1.z.string(),
    TranId: zod_1.z.string(),
    isBooked: zod_1.z.string()
});
exports.BookingValidate = {
    BookingValidationWithZod,
};
