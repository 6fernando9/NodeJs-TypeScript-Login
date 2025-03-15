import { ErrorCode, HttpException } from "./root";

export class UnauthorizedException extends HttpException{
    constructor(mensaje: string, errorCode: ErrorCode){
        super(mensaje,errorCode,404,null);
    }
}