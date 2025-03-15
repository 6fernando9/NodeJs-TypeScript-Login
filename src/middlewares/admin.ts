import { NextFunction, Request, Response } from "express";

//middleware para determinar si es un usuario administradpr
const adminMiddleware = async (req: Request,res: Response,next: NextFunction) => {
    //podriamos hacerlo mediante el jwt o directo mediante las 
    // relaciones que manejan las entidedes de la base de datos
}
export default adminMiddleware;