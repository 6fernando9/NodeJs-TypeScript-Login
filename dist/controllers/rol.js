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
exports.deletePermissionToRole = exports.addPermissionToRole = exports.findRoleById = exports.deleteRol = exports.getAllRoles = exports.updateRol = exports.createRol = void 0;
const rol_schema_1 = require("../schemas/rol-schema");
const __1 = require("..");
const not_found_1 = require("../exceptions/not-found");
const found_1 = require("../exceptions/found");
const root_1 = require("../exceptions/root");
const bad_request_1 = require("../exceptions/bad-request");
const permiso_schema_1 = require("../schemas/permiso-schema");
const createRol = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //validamos los datos del rol, con el esquema de validacion
    const validatedData = rol_schema_1.CreateRolSchema.parse(req.body);
    const { nombre } = req.body;
    //creamos el rol
    const createRol = yield __1.prismaClient.rol.create({
        data: { nombre }
    });
    res.json(createRol);
});
exports.createRol = createRol;
const updateRol = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //validamos los datos del rol, con el esquema de validacion
    const validatedData = rol_schema_1.CreateRolSchema.parse(req.body);
    const { nombre } = req.body;
    const updatedRole = yield __1.prismaClient.rol.update({
        where: {
            id: +req.params.id
        },
        data: {
            nombre
        }
    });
    res.json(updatedRole);
});
exports.updateRol = updateRol;
const getAllRoles = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const roleList = yield __1.prismaClient.rol.findMany();
    res.json(roleList);
});
exports.getAllRoles = getAllRoles;
const deleteRol = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield __1.prismaClient.rol.delete({
        where: {
            id: +req.params.id
        }
    });
    res.json({ success: "Rol Eliminado con Exito" });
});
exports.deleteRol = deleteRol;
const findRoleById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const rol = yield __1.prismaClient.rol.findUnique({
        where: { id: +req.params.id },
        include: {
            permisos: true
        }
    });
    if (!rol) {
        throw new not_found_1.NotFoundException("Error Rol No encontrado..", root_1.ErrorCode.ROL_NO_ENCONTRADO);
    }
    res.json(rol);
});
exports.findRoleById = findRoleById;
//http://localhost:3000/api/rol/1
//le enviaremos un objeto permiso
//ejemplo
//rol: ADMIN
//permisos: add user, edit user
//el json tendra un objeto permiso
const addPermissionToRole = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //Validamos los datos que vienen, si sale error entonces lanza la excepcion
    try {
        //verificamos la entrada del permiso a agregar
        const validatedData = permiso_schema_1.UpdatePermissionSchema.parse(req.body);
    }
    catch (error) {
        throw new bad_request_1.BadRequestException("Error...Formato no valido...", root_1.ErrorCode.PERMISO_FORMATO_NO_VALIDO);
    }
    const { id } = req.body;
    //console.log(validatedData)
    const existePermisoEnBd = yield __1.prismaClient.permiso.findFirst({
        where: { id }
    });
    if (!existePermisoEnBd) {
        throw new not_found_1.NotFoundException("Error..Permiso no Encontrado...", root_1.ErrorCode.PERMISO_NOT_FOUND);
    }
    // console.log(validatedData);
    // Validamos el ID del rol
    //verificamos si existe el permiso a agregar
    const existePermisoAsignadoAlRol = yield __1.prismaClient.rol.findFirst({
        where: {
            id: +req.params.id,
            permisos: {
                some: { id }
            }
        }
    });
    //si existe entonces no podemos duplicar el mismo permiso
    if (existePermisoAsignadoAlRol) {
        throw new found_1.FoundException("Error..El Permiso ya esta registrado en el sistema..", root_1.ErrorCode.PERMISO_YA_REGISTRADO);
    }
    //si no existe el permiso entonces lo agregamos
    console.log('llege antes de actualizar');
    const createPermissionToRol = yield __1.prismaClient.rol.update({
        where: {
            id: +req.params.id
        },
        data: {
            permisos: {
                connect: [{ id }] //solo se requiere el id, no el objeto entero
            }
        },
        include: {
            permisos: true
        }
    });
    res.json(createPermissionToRol);
});
exports.addPermissionToRole = addPermissionToRole;
const deletePermissionToRole = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //capturamos el permiso que viene
    try {
        //verificamos si existe el permiso a agregar
        const existsPermission = yield __1.prismaClient.permiso.findFirst({
            where: { id: +req.params.id }
        });
        //si existe entonces no podemos duplicar el mismo permiso
        if (!existsPermission) {
            throw new not_found_1.NotFoundException("Error..permiso no encontrado..", root_1.ErrorCode.PERMISO_NOT_FOUND);
        }
        //si no existe el permiso entonces lo agregamos
        const { id } = req.body;
        yield __1.prismaClient.rol.update({
            where: {
                id: +req.params.id
            },
            data: {
                permisos: {
                    disconnect: [{ id }]
                }
            }
        });
        res.json({ message: "Permiso Eliminado con exito" });
    }
    catch (error) {
        throw new bad_request_1.BadRequestException("Error...Formato no valido...", root_1.ErrorCode.PERMISO_FORMATO_NO_VALIDO);
    }
});
exports.deletePermissionToRole = deletePermissionToRole;
