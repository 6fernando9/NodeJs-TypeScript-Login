"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterSchema = void 0;
const zod_1 = require("zod");
//estructura de un Schema, para validaciones
exports.RegisterSchema = zod_1.z.object({
    nombre: zod_1.z.string(),
    email: zod_1.z.string().email(),
    password: zod_1.z.string()
});
