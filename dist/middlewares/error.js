"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
//captura el objeto HttpException
//por eso es clave poner el status correcto
//el error personalizado no pasa nada
const errorMiddleware = (error, req, res, next) => {
    res.status(error.statusCode).json({
        mensaje: error.message,
        errorCode: error.errorCode, // aqui muestro el error personalizado
        errores: error.errors,
        fecha: new Date().toISOString()
    });
};
exports.errorMiddleware = errorMiddleware;
