import { Router } from "express";
import { errorHandler } from "../error-handler";
import { AddComment, DeleteComment, getCommentById, prueba, updateComment } from "../controllers/comentario";
import upload from "../config/multer";
import authMiddleware from "../middlewares/auth";



const comentarioRouter: Router = Router();

comentarioRouter.post('/',upload.array("imagenes",2),[authMiddleware],errorHandler(AddComment));
comentarioRouter.delete('/:id',[authMiddleware],errorHandler(DeleteComment));
comentarioRouter.post('/prueba',upload.none(),prueba);
comentarioRouter.put('/:id/update',upload.array("imagenesAAgregar",1),[authMiddleware],errorHandler(updateComment));
comentarioRouter.get('/:id',errorHandler(getCommentById));

export default comentarioRouter;