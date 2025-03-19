import { Router } from "express";
import { errorHandler } from "../error-handler";
import { AddComment } from "../controllers/comentario";
import upload from "../config/multer";
import authMiddleware from "../middlewares/auth";

const comentarioRouter: Router = Router();

comentarioRouter.post('/',upload.array("imagenes",2),[authMiddleware],errorHandler(AddComment));

export default comentarioRouter;