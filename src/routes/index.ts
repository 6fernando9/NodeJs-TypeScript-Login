import { Router } from "express";
import rolRouter from "./rol-router";

const rootRouter: Router = Router();

//aqui definimos las rutas basicas


rootRouter.use('/rol',rolRouter);

export default rootRouter;