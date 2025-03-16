import { Router } from "express";
import rolRouter from "./rol-router";
import authRouter from "./auth";
import { errorHandler } from "../error-handler";
import permisoRouter from "./permisos-router";

const rootRouter: Router = Router();

//aqui definimos las rutas basicas


rootRouter.use('/rol',rolRouter);
rootRouter.use('/auth',authRouter);
rootRouter.use('/permisos',permisoRouter);
export default rootRouter;