"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const jwt = __importStar(require("jsonwebtoken"));
const secrets_1 = require("../secrets");
const __1 = require("..");
const unauthorized_1 = require("../exceptions/unauthorized");
const root_1 = require("../exceptions/root");
const not_found_1 = require("../exceptions/not-found");
//middleware para ver si el usuario tiene un jwt valido
///esto podria modificarse
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //primero extraemos el token del header
    const token = req.headers.authorization;
    //si el token no esta presente tiramos una exception
    if (!token) { //crearemos una exception
        next(new unauthorized_1.UnauthorizedException("Unauthorized", root_1.ErrorCode.UNAUTHORIZED));
    }
    //si esta presente, entonces lo decodificaremos
    try {
        //extraemos el payload
        const payload = jwt.verify(token, secrets_1.JWT_SECRET_KEY);
        //obtendremos al usuario del jwt
        const usuarioDelJwt = yield __1.prismaClient.usuario.findFirstOrThrow({
            where: {
                id: payload.id
            }
        });
        if (!usuarioDelJwt) {
            next(new not_found_1.NotFoundException("Error Usuario No Encontrado..", root_1.ErrorCode.USUARIO_NO_ENCONTRADO));
        }
        //lo agregamos a los request para poder usarlo donde sea
        req.usuario = usuarioDelJwt;
        next();
    }
    catch (error) {
        next(new unauthorized_1.UnauthorizedException("Unauthorized", root_1.ErrorCode.UNAUTHORIZED));
    }
});
exports.default = authMiddleware;
