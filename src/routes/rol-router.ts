import { Router } from "express";
import { addPermissionToRole, createRol, deletePermissionToRole, deleteRol, findRoleById, getAllRoles, updateRol } from "../controllers/rol";
import { errorHandler } from "../error-handler";

const rolRouter: Router = Router();

//desde el index.ts main viene el /api
//desde el main del las rutas viene el /rol, es decir ya esta /api/rol

//ACA USAMOS EL GET,POST,DELETE.UPDATE
rolRouter.post('/',errorHandler(createRol));
rolRouter.delete('/:id',errorHandler(deleteRol));
rolRouter.get('/',errorHandler(getAllRoles));
rolRouter.put('/:id',errorHandler(updateRol));
rolRouter.get('/:id',errorHandler(findRoleById));
//para agregar permisos a un rol
rolRouter.post('/:id/permiso',errorHandler(addPermissionToRole));
//para eliminar permisos a un rol
rolRouter.delete('/:id/permiso',errorHandler(deletePermissionToRole));

export default rolRouter;
