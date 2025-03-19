"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TipoSesion = exports.Roles = exports.ErrorCode = exports.HttpException = void 0;
class HttpException extends Error {
    //recibe el mensaje o descripcion del error
    //recibe el codigo de error interno, como error personalizado
    //recibe el codigo HTTP de respuesta
    //detalles adicionales del error
    constructor(message, errorCode, statusCode, error) {
        super(message);
        this.message = message;
        this.errorCode = errorCode;
        this.statusCode = statusCode;
        this.errors = error;
    }
}
exports.HttpException = HttpException;
var ErrorCode;
(function (ErrorCode) {
    // ERRORES DE USUARIO 1001-1099
    ErrorCode[ErrorCode["USUARIO_NO_ENCONTRADO"] = 1001] = "USUARIO_NO_ENCONTRADO";
    ErrorCode[ErrorCode["INCORRECT_PASSWORD"] = 1002] = "INCORRECT_PASSWORD";
    ErrorCode[ErrorCode["USUARIO_YA_REGISTRADO"] = 1003] = "USUARIO_YA_REGISTRADO";
    ErrorCode[ErrorCode["USUARIO_SIN_IP"] = 1004] = "USUARIO_SIN_IP";
    //ERRORES DE ROL 2001-2099
    ErrorCode[ErrorCode["ROL_NO_ENCONTRADO"] = 2001] = "ROL_NO_ENCONTRADO";
    //ERRORES DE PERMISO DE 3001-3099
    ErrorCode[ErrorCode["PERMISO_FORMATO_NO_VALIDO"] = 3001] = "PERMISO_FORMATO_NO_VALIDO";
    ErrorCode[ErrorCode["PERMISO_NOT_FOUND"] = 3002] = "PERMISO_NOT_FOUND";
    ErrorCode[ErrorCode["PERMISO_YA_REGISTRADO"] = 3003] = "PERMISO_YA_REGISTRADO";
    //COMENTARIO
    ErrorCode[ErrorCode["COMENTARIO_FORMATO_NO_VALIDO"] = 6001] = "COMENTARIO_FORMATO_NO_VALIDO";
    ErrorCode[ErrorCode["BAD_REQUEST"] = 4000] = "BAD_REQUEST";
    ErrorCode[ErrorCode["UNAUTHORIZED"] = 4003] = "UNAUTHORIZED";
    ErrorCode[ErrorCode["INTERNAL_EXCEPTION"] = 5001] = "INTERNAL_EXCEPTION";
    ErrorCode[ErrorCode["UNPROCCESSABLE_ENTITY"] = 4001] = "UNPROCCESSABLE_ENTITY";
})(ErrorCode || (exports.ErrorCode = ErrorCode = {}));
var Roles;
(function (Roles) {
    Roles["ADMIN"] = "ADMIN";
    Roles["USUARIO"] = "USUARIO";
    Roles["TRABAJADOR"] = "TRABAJADOR";
})(Roles || (exports.Roles = Roles = {}));
var TipoSesion;
(function (TipoSesion) {
    TipoSesion["INICIO_SESION"] = "I";
    TipoSesion["CIERRE_SESION"] = "C";
    TipoSesion["REGISTRO_SESION"] = "R";
})(TipoSesion || (exports.TipoSesion = TipoSesion = {}));
