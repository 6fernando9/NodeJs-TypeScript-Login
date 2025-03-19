"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rol_1 = require("../controllers/rol");
const error_handler_1 = require("../error-handler");
const rolRouter = (0, express_1.Router)();
//desde el index.ts main viene el /api
//desde el main del las rutas viene el /rol, es decir ya esta /api/rol
//ACA USAMOS EL GET,POST,DELETE.UPDATE
rolRouter.post('/', (0, error_handler_1.errorHandler)(rol_1.createRol));
rolRouter.delete('/:id', (0, error_handler_1.errorHandler)(rol_1.deleteRol));
rolRouter.get('/', (0, error_handler_1.errorHandler)(rol_1.getAllRoles));
rolRouter.put('/:id', (0, error_handler_1.errorHandler)(rol_1.updateRol));
rolRouter.get('/:id', (0, error_handler_1.errorHandler)(rol_1.findRoleById));
//para agregar permisos a un rol
rolRouter.post('/:id/permiso', (0, error_handler_1.errorHandler)(rol_1.addPermissionToRole));
//para eliminar permisos a un rol
rolRouter.delete('/:id/permiso', (0, error_handler_1.errorHandler)(rol_1.deletePermissionToRole));
exports.default = rolRouter;
