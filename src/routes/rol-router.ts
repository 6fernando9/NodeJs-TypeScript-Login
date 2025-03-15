import { Router } from "express";
import { createRol, deleteRol, getAllRoles, updateRol } from "../controllers/rol";

const rolRouter: Router = Router();

//desde el index.ts main viene el /api
//desde el main del las rutas viene el /rol, es decir ya esta /api/rol

//ACA USAMOS EL GET,POST,DELETE.UPDATE
rolRouter.post('/',createRol);
rolRouter.delete('/:id',deleteRol);
rolRouter.get('/',getAllRoles);
rolRouter.put('/:id',updateRol);

export default rolRouter;
