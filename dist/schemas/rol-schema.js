"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateRolSchema = void 0;
const zod_1 = require("zod");
// estructura
// export const UpperCaseSchema = z.object({})
exports.CreateRolSchema = zod_1.z.object({
    nombre: zod_1.z.string()
});
