import { NextFunction, Request, Response } from "express";

type AsyncHandler = ( req: Request,res: Response, next: NextFunction ) => Promise<void>;
export const validationSchemaHandler = (method: AsyncHandler) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await method(req,res,next);// se ejecuta el metodo de manera asincrona
        } catch (error: any) {
            //se dirige al middleware de error donde genera el error
            next(error);
        }
    }
}