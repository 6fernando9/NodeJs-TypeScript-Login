import { Router } from "express";
import { createPermission, deletePermission, listAllPermission, updatePermission } from "../controllers/permisos";
import { errorHandler } from "../error-handler";

const permisoRouter: Router = Router();

permisoRouter.post('/',errorHandler(createPermission));
permisoRouter.get('/',errorHandler(listAllPermission));
permisoRouter.put('/:id',errorHandler(updatePermission));
permisoRouter.delete("/:id", errorHandler(deletePermission));
export default permisoRouter;