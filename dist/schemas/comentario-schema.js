"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComentarioSchema = void 0;
const zod_1 = require("zod");
exports.ComentarioSchema = zod_1.z.object({
    //puntaje: z.number().min(0,"Minimo 0 de puntaje").max(5,"Maximo 5 de puntaje"),
    puntaje: zod_1.z.string(),
    descripcion: zod_1.z.string(),
});
