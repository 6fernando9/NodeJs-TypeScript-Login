export class HttpException extends Error {
  message: string;
  errorCode: any;
  statusCode: number;
  errors: ErrorCode;
//recibe el mensaje o descripcion del error
//recibe el codigo de error interno, como error personalizado
//recibe el codigo HTTP de respuesta
//detalles adicionales del error
  constructor(message: string, errorCode: any, statusCode: number, error: any) {
    super(message);
    this.message = message;
    this.errorCode = errorCode;
    this.statusCode = statusCode;
    this.errors = error;
  }
}

export enum ErrorCode{
 // ERRORES DE USUARIO 1001-1099
 USUARIO_NO_ENCONTRADO = 1001,
 INCORRECT_PASSWORD = 1002,
 USUARIO_YA_REGISTRADO = 1003,
 USUARIO_SIN_IP = 1004,
 //ERRORES DE ROL 2001-2099
 ROL_NO_ENCONTRADO = 2001,
 //ERRORES DE PERMISO DE 3001-3099
 PERMISO_FORMATO_NO_VALIDO = 3001,
 PERMISO_NOT_FOUND = 3002,
 BAD_REQUEST = 4000,
 UNAUTHORIZED = 4003,
 INTERNAL_EXCEPTION = 5001,
 UNPROCCESSABLE_ENTITY = 4001 
}

export enum Roles{
    ADMIN= "ADMIN",USUARIO = "USUARIO",TRABAJADOR = "TRABAJADOR"
}

export enum TipoSesion{
    INICIO_SESION = "I",
    CIERRE_SESION = "C",
    REGISTRO_SESION = "R"

}