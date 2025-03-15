import { ErrorCode, HttpException } from "./root";

export class BadRequestException extends HttpException{
    constructor(mensaje: string, errorCode: ErrorCode){
        super(mensaje,errorCode,400,null);
    }
}