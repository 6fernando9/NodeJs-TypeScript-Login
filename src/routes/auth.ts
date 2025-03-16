import { Router } from "express";
import { login, register } from "../controllers/auth";
import { errorHandler } from "../error-handler";

//usamos una ruta
const authRouter: Router = Router();

authRouter.post('/register',errorHandler(register));
authRouter.post('/login',errorHandler(login));

export default authRouter;
