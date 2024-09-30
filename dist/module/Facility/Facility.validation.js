"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacilityValidate = void 0;
const zod_1 = require("zod");
const FacilityValidationWithZod = zod_1.z.object({
    name: zod_1.z.string(),
    description: zod_1.z.string(),
    pricePerHour: zod_1.z.number(),
    location: zod_1.z.string(),
    image: zod_1.z.string()
});
const UpdateFacilityValidationWithZod = zod_1.z.object({
    name: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    pricePerHour: zod_1.z.number().optional(),
    location: zod_1.z.string().optional(),
    image: zod_1.z.string().optional()
});
exports.FacilityValidate = {
    FacilityValidationWithZod,
    UpdateFacilityValidationWithZod,
};
