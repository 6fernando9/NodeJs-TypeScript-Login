import { NextFunction, Request, Response } from "express";
import { HttpException } from "../exceptions/root";

//captura el objeto HttpException
//por eso es clave poner el status correcto
//el error personalizado no pasa nada
export const errorMiddleware = (error: HttpException, req: Request, res: Response, next: NextFunction ) => {
    res.status(error.statusCode).json({
        mensaje: error.message,
        errorCode: error.errorCode, // aqui muestro el error personalizado
        errores: error.errors,
        fecha: new Date().toISOString()
    })
}

