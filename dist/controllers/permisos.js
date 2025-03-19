"use strict";
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
exports.listAllPermission = exports.deletePermission = exports.updatePermission = exports.createPermission = void 0;
const permiso_schema_1 = require("../schemas/permiso-schema");
const __1 = require("..");
const bad_request_1 = require("../exceptions/bad-request");
const root_1 = require("../exceptions/root");
const not_found_1 = require("../exceptions/not-found");
const createPermission = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validatedData = permiso_schema_1.CreatePermissionSchema.parse(req.body);
        const permission = yield __1.prismaClient.permiso.create({
            data: {
                nombre: validatedData.nombre
            },
        });
        res.json({ permission, message: "permiso creado con exito" });
    }
    catch (error) {
        throw new bad_request_1.BadRequestException("Error Formato de Permiso no valido", root_1.ErrorCode.PERMISO_FORMATO_NO_VALIDO);
    }
});
exports.createPermission = createPermission;
const updatePermission = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validatedData = permiso_schema_1.CreatePermissionSchema.parse(req.body);
        const permission = yield __1.prismaClient.permiso.update({
            where: { id: +req.params.id },
            data: {
                nombre: validatedData.nombre,
            },
        });
        res.json({ permission, message: "permiso actualizado con exito" });
    }
    catch (error) {
        throw new bad_request_1.BadRequestException("Error Formato de Permiso no valido", root_1.ErrorCode.PERMISO_FORMATO_NO_VALIDO);
    }
});
exports.updatePermission = updatePermission;
const deletePermission = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const permission = yield __1.prismaClient.permiso.findFirstOrThrow({
        where: { id: +req.params.id },
    });
    if (!permission) {
        throw new not_found_1.NotFoundException("Error Formato de Permiso no valido", root_1.ErrorCode.PERMISO_NOT_FOUND);
    }
    yield __1.prismaClient.permiso.delete({
        where: { id: permission.id },
    });
    res.json({ message: "permiso eliminado con exito" });
});
exports.deletePermission = deletePermission;
const listAllPermission = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.json(yield __1.prismaClient.permiso.findMany());
});
exports.listAllPermission = listAllPermission;
