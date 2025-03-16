import { Router } from "express";
import { createRol, deleteRol, getAllRoles, updateRol } from "../controllers/rol";
import { errorHandler } from "../error-handler";

const rolRouter: Router = Router();

//desde el index.ts main viene el /api
//desde el main del las rutas viene el /rol, es decir ya esta /api/rol

//ACA USAMOS EL GET,POST,DELETE.UPDATE
rolRouter.post('/',errorHandler(createRol));
rolRouter.delete('/:id',errorHandler(deleteRol));
rolRouter.get('/',errorHandler(getAllRoles));
rolRouter.put('/:id',errorHandler(updateRol));

export default rolRouter;
