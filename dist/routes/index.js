"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rol_router_1 = __importDefault(require("./rol-router"));
const auth_1 = __importDefault(require("./auth"));
const permisos_router_1 = __importDefault(require("./permisos-router"));
const comentario_router_1 = __importDefault(require("./comentario-router"));
const rootRouter = (0, express_1.Router)();
//aqui definimos las rutas basicas
rootRouter.use('/rol', rol_router_1.default);
rootRouter.use('/auth', auth_1.default);
rootRouter.use('/permisos', permisos_router_1.default);
rootRouter.use('/comentarios', comentario_router_1.default);
exports.default = rootRouter;
