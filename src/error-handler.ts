import { NextFunction, Request, Response } from "express";
import { ErrorCode, HttpException } from "./exceptions/root";
import { ZodError } from "zod";
import { BadRequestException } from "./exceptions/bad-request";
import { InternalException } from "./exceptions/internal-exception";

//funcion que recibe un callback es decir una funcion que retorna una promesa,
//  generalmente son todas las funciones utilizadas en el controlador

type AsyncHandler = ( req: Request,res: Response, next: NextFunction ) => Promise<void>;
export const errorHandler = (method: AsyncHandler) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await method(req,res,next);// se ejecuta el metodo de manera asincrona
        } catch (error: any) {
            //si ocurre un error lo captura
            let exception: HttpException;
            if(error instanceof HttpException){
                exception = error;
            }else{
                if(error instanceof ZodError){
                    exception = new BadRequestException("No Se puede procesar la entidad", ErrorCode.UNPROCCESSABLE_ENTITY);
                }else{
                    exception = new InternalException("Algunas cosas salieron mal..",ErrorCode.INTERNAL_EXCEPTION,error);
                }
            }
            //se dirige al middleware de error donde genera el error
            next(exception);
        }
    }
}