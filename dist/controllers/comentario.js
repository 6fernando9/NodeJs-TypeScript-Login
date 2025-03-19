"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddComment = void 0;
const bad_request_1 = require("../exceptions/bad-request");
const root_1 = require("../exceptions/root");
const comentario_schema_1 = require("../schemas/comentario-schema");
const __1 = require("..");
/*
el formato del comentario deberia ser
{
    "descripcion":"muy bueno",
    "puntaje":4,
    "imagen_url":
}
 */
//crea imagenes y aunque venga nulo igualmente lo crea normal
const AddComment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validatedData = comentario_schema_1.ComentarioSchema.parse(req.body);
        const { puntaje, descripcion } = validatedData;
        const puntajeNumerico = Number(puntaje);
        if (!esPuntajeValido(puntajeNumerico))
            throw new bad_request_1.BadRequestException("Error puntaje no valido", root_1.ErrorCode.COMENTARIO_FORMATO_NO_VALIDO);
        const imagenes = req.files;
        console.log(`imagenes: ${imagenes}`);
        //  console.log('LLegue hasta el antes del imagenes Data')
        const imagenesData = imagenes.map((file) => ({
            id_generado: file.filename, // Cloudinary genera un ID único, a diferencia de JAVA
            nombre: file.originalname,
            enlace: file.path.toString(), // La URL de Cloudinary
        }));
        const imagenesASubir = imagenesData;
        const comentarioASubir = {
            puntaje: puntajeNumerico,
            descripcion,
            imagenes: imagenesASubir
        };
        //  const nuevoComentario = await prismaClient
        const nuevoComentario = yield crearComentarioConImagenes(comentarioASubir);
        res.json(nuevoComentario);
    }
    catch (error) {
        throw new bad_request_1.BadRequestException("Error Formato de Comentario no valido", root_1.ErrorCode.COMENTARIO_FORMATO_NO_VALIDO);
    }
});
exports.AddComment = AddComment;
const crearComentarioConImagenes = (comentario) => __awaiter(void 0, void 0, void 0, function* () {
    const nuevoComentario = yield __1.prismaClient.comentario.create({
        data: {
            puntaje: comentario.puntaje,
            descripcion: comentario.descripcion,
            imagenes: {
                createMany: {
                    data: comentario.imagenes,
                },
            },
        },
        include: {
            imagenes: true,
        },
    });
    return nuevoComentario;
});
const esPuntajeValido = (puntaje) => {
    return puntaje >= 0 && puntaje <= 5;
};
