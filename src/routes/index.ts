import { Router } from "express";
import rolRouter from "./rol-router";
import authRouter from "./auth";
import permisoRouter from "./permisos-router";
import comentarioRouter from "./comentario-router";

const rootRouter: Router = Router();

//aqui definimos las rutas basicas


rootRouter.use('/rol',rolRouter);
rootRouter.use('/auth',authRouter);
rootRouter.use('/permisos',permisoRouter);
rootRouter.use('/comentarios',comentarioRouter);
export default rootRouter;