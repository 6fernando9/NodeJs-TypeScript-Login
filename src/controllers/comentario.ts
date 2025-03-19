import { NextFunction, Request, Response } from "express";
import { BadRequestException } from "../exceptions/bad-request";
import { ErrorCode } from "../exceptions/root";
import { ComentarioSchema } from "../schemas/comentario-schema";
import { prismaClient } from "..";
import { IComentario, IImagen } from "../services/interfaces/comentario";



/*
el formato del comentario deberia ser 
{
    "descripcion":"muy bueno",
    "puntaje":4,
    "imagen_url":
}
 */
//crea imagenes y aunque venga nulo igualmente lo crea normal
export const AddComment = async (req: Request,res: Response,next: NextFunction) => {
     try {
         const validatedData = ComentarioSchema.parse(req.body);
         const {puntaje, descripcion} = validatedData;
        const puntajeNumerico = Number(puntaje);

        if(!esPuntajeValido(puntajeNumerico))
            throw new BadRequestException("Error puntaje no valido",ErrorCode.COMENTARIO_FORMATO_NO_VALIDO);

         const imagenes = req.files as Express.Multer.File[];
         console.log(`imagenes: ${imagenes}`);
        //  console.log('LLegue hasta el antes del imagenes Data')
         const imagenesData = imagenes.map((file) => ({
           id_generado: file.filename, // Cloudinary genera un ID único, a diferencia de JAVA
           nombre: file.originalname,
           enlace: (file as any).path.toString(), // La URL de Cloudinary
         }));

         const imagenesASubir: IImagen[] = imagenesData;
         const comentarioASubir: IComentario = {
            puntaje:puntajeNumerico,
            descripcion,
            imagenes:imagenesASubir
         }
        //  const nuevoComentario = await prismaClient
         const nuevoComentario = await crearComentarioConImagenes(comentarioASubir);

        res.json(nuevoComentario);
    } catch (error) {
        throw new BadRequestException("Error Formato de Comentario no valido",ErrorCode.COMENTARIO_FORMATO_NO_VALIDO);
    }
}

const crearComentarioConImagenes = async (comentario: IComentario) => {
    const nuevoComentario = await prismaClient.comentario.create({
      data: {
        puntaje: comentario.puntaje,
        descripcion: comentario.descripcion,
        imagenes: {
          createMany: {
            data: comentario.imagenes!,
          },
        },
      },
      include: {
        imagenes: true,
      },
    });
    return nuevoComentario;
}
const esPuntajeValido = (puntaje: number) =>{
    return puntaje >= 0 && puntaje <= 5;
}
