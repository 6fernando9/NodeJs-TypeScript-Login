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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.login = void 0;
const bcrypt_1 = require("bcrypt");
const __1 = require("..");
const secrets_1 = require("../secrets");
const jwt = __importStar(require("jsonwebtoken"));
const not_found_1 = require("../exceptions/not-found");
const root_1 = require("../exceptions/root");
const bad_request_1 = require("../exceptions/bad-request");
const found_1 = require("../exceptions/found");
const bitacora_observer_1 = require("../services/bitacora-observer");
const unauthorized_1 = require("../exceptions/unauthorized");
//metodo de login
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //destructuramos los datos
    const { email, password } = req.body;
    //lo buscamos al usuario por email
    let usuario = yield __1.prismaClient.usuario.findUnique({ where: { email } });
    if (!usuario) {
        throw new not_found_1.NotFoundException("Error Usuario No encontrado..", root_1.ErrorCode.USUARIO_NO_ENCONTRADO);
    }
    //comparamos contrasenias
    const passwordMatch = yield (0, bcrypt_1.compare)(password, usuario.password);
    if (!passwordMatch) {
        throw new bad_request_1.BadRequestException("Error contraseña Incorrecta", root_1.ErrorCode.INCORRECT_PASSWORD);
    }
    //si todo esta correcto entonces creamos el jwt con la firma 
    //aca podriamos meter los roles
    const token = jwt.sign({
        sub: usuario.id,
        //faltaria roles y permisos guardarlo
    }, secrets_1.JWT_SECRET_KEY);
    const ipUsuario = captureIpUser(req);
    console.log(`ip del usuario: ${ipUsuario}`);
    const bitacoraUser = createBitacoraUser(usuario.id, usuario.nombre, ipUsuario, root_1.TipoSesion.INICIO_SESION);
    //registramos el Inicio de sesion del usuario
    bitacora_observer_1.usuarioObserver.emit("registrarABitacoraDeUsuario", bitacoraUser);
    //le quitamos la contrasenia al usuario
    const { password: _ } = usuario, usuarioSinContra = __rest(usuario, ["password"]);
    res.json({ message: `Bienvenido usuario ${usuarioSinContra.nombre}`,
        usuario: usuarioSinContra,
        token }); //devolvemos un json conformado por 2 objetos
});
exports.login = login;
//metodo de registro de usuarios
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // capturamos los datos que vienen del request
    const { email, nombre, password } = req.body;
    let usuario = yield __1.prismaClient.usuario.findUnique({
        where: { email },
    });
    if (usuario) {
        next(new found_1.FoundException("Error..usuario ya esta registrado en el sistema", root_1.ErrorCode.USUARIO_YA_REGISTRADO));
    }
    //si no existe entonces lo creamos
    //primero buscamos el rol por defecto
    const rol = yield findRolByName(root_1.Roles.USUARIO);
    if (!rol) {
        next(new not_found_1.NotFoundException("Error Rol No encontrado...", root_1.ErrorCode.ROL_NO_ENCONTRADO));
        return;
    }
    //creamos el usuario
    usuario = yield __1.prismaClient.usuario.create({
        data: {
            nombre,
            email,
            rolId: rol.id,
            password: (0, bcrypt_1.hashSync)(password, 10),
        },
    });
    const ipUsuario = captureIpUser(req);
    console.log(`ip del usuario: ${ipUsuario}`);
    const bitacoraUser = createBitacoraUser(usuario.id, usuario.nombre, ipUsuario, root_1.TipoSesion.REGISTRO_SESION);
    //registramos el registro de usuario en la bitacora
    bitacora_observer_1.usuarioObserver.emit("registrarABitacoraDeUsuario", bitacoraUser);
    //destructuramos para que retorne un objeto sin contrasenia
    const { password: __ } = usuario, usuarioSinPassword = __rest(usuario, ["password"]);
    res.json(usuarioSinPassword);
});
exports.register = register;
const findRolByName = (nombre) => __awaiter(void 0, void 0, void 0, function* () {
    const rol = yield __1.prismaClient.rol.findFirst({
        where: {
            nombre
        }
    });
    return rol;
});
const captureIpUser = (req) => {
    let ipUsuario = req.ip;
    console.log(`req.ip: ${req.ip}`);
    // 📌 Si hay un proxy, tomar la IP real del usuario
    const forwarded = req.headers["x-forwarded-for"];
    if (typeof forwarded === "string") {
        ipUsuario = forwarded.split(",")[0]; // Extraer la primera IP real
    }
    if (!ipUsuario) {
        throw new unauthorized_1.UnauthorizedException("Error Usuario Sin Ip", root_1.ErrorCode.USUARIO_SIN_IP);
    }
    return ipUsuario;
};
const createBitacoraUser = (usuarioId, nombre, ip, tipo_sesion) => {
    const bitacoraUser = {
        usuarioId, nombre, ip, tipo_sesion
    };
    return bitacoraUser;
};
