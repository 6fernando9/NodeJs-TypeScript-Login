import { NextFunction, Request, Response } from "express";
import { BadRequestException } from "../exceptions/bad-request";
import { ErrorCode } from "../exceptions/root";
import { ComentarioSchema } from "../schemas/comentario-schema";
import { prismaClient } from "..";
import { IComentario, IImagen } from "../services/interfaces/comentario";
import { Imagen, Usuario } from "@prisma/client";
import { NotFoundException } from "../exceptions/not-found";
import cloudinary from "../config/cloudinary";



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

        ///aqui se sube a cloudinary, sin mas
         const imagenes = req.files as Express.Multer.File[];
         console.log(`imagenes: ${imagenes}`);
        //  METODOS DE PRUEBA
         const imagenesData = parsearAImagenCloudinary(imagenes);
         const imagenesASubir: IImagen[] = imagenesData;
         const comentarioASubir: IComentario = {
            idUsuario: req.usuario!.id,
            puntaje:puntajeNumerico,
            descripcion,
            imagenes:imagenesASubir
         }
         
         const nuevoComentario = await crearComentarioConImagenes(comentarioASubir);
         //PARECE QUE FUNCARON

        res.json(nuevoComentario);
    } catch (error) {
        throw new BadRequestException("Error Formato de Comentario no valido",ErrorCode.COMENTARIO_FORMATO_NO_VALIDO);
    }
}

//elimina un comentario dado el id
export const DeleteComment = async (req:Request, res: Response, next: NextFunction) => {
  const comentario = await prismaClient.comentario.findUnique({
    where:{
      id: +req.params.id
    },
    include:{
      imagenes: true
    }
  })
  if(!comentario){
    throw new NotFoundException("Error.. Comentario no Encontrado..",ErrorCode.COMENTARIO_NO_ENCONTRADO);
  }
  //BORRADO A NIVEL FISICO
  await eliminarImagenesANivelFisico(comentario.imagenes);

  //BORRADO A NIVEL "LOGICO" DE LA BD
  await prismaClient.comentario.delete({where:{id: +req.params.id}})
  res.json({message: "Comentario Eliminado"})
}

///que actualize el comentario
//recibe 2 arrays uno de las imagenes nuevas a agregar, y otro con las imagenes a borrar(JSON), ademas de la 
// descripcion y puntaje actualizados
export const updateComment = async (req: Request, res: Response, next: NextFunction) => {
   const { descripcion, puntaje,imagenesAEliminar} = req.body;
   console.log(puntaje);
   console.log(descripcion);
   console.log(imagenesAEliminar);
  let comentario = await prismaClient.comentario.findUnique({
    where:{
      id: +req.params.id
    },
    include:{
      imagenes: true
    }
  })
  if(!comentario){
    throw new NotFoundException("Error.. Comentario no Encontrado..",ErrorCode.COMENTARIO_NO_ENCONTRADO);
  }
  // const { descripcion,puntaje } = req.body;
  // console.log(puntaje)
  // console.log(descripcion);
   const puntajeNumerico = Number(puntaje);

  if(!esPuntajeValido(puntajeNumerico))
    throw new BadRequestException("Error puntaje no valido",ErrorCode.COMENTARIO_FORMATO_NO_VALIDO);
  //si existe imagenes a eliminar

  const jsonImagenesAEliminar = JSON.parse(req.body.imagenesAEliminar || "[]");

  if(imagenesAEliminar && imagenesAEliminar.length > 0){
    await Promise.all(
      jsonImagenesAEliminar.map(async (image: Imagen) => {
        //eliminamos a nivel fisico
        console.log(image.id_generado);
        await cloudinary.uploader.destroy(image.id_generado);
        //borrado a nivel base de datos
        await prismaClient.imagen.delete({
          where:{
            id:image.id
          }
        });
      })
    )
  }
  //si existe imagenes a agregar
  //capturamos del cliente las imagenes
  const imagenes = req.files as Express.Multer.File[];
  console.log(imagenes)
  if(imagenes && imagenes.length > 0){
    //las parseamos a objetos cloudinary
    const imagenesAAgregar = parsearAImagenCloudinary(imagenes);
    comentario = await prismaClient.comentario.update({
      where:{
        id:+req.params.id
      },
      data:{
        descripcion,
        puntaje:puntajeNumerico,
        idUsuario:req.usuario!.id,
        imagenes:{
          create: imagenesAAgregar
        }
      },include:{
        imagenes:true
      }
    })
  }
  res.json(comentario);
}
export const getCommentById = async (req: Request,res: Response,next: NextFunction) => {
    const comentario = await prismaClient.comentario.findUnique({
      where:{
        id:+req.params.id
      },
      include:{
        imagenes:true
      }
    })
    if(!comentario){
      throw new NotFoundException("Error Comentario no encontrado..",ErrorCode.COMENTARIO_NO_ENCONTRADO);
    }
    res.json(comentario);
}
export const prueba = async (req: Request,res: Response,next: NextFunction) => {
  console.log(req.body)
  const {numero,cadena} = req.body;
  console.log(req.body)
  console.log(numero);
  console.log(cadena);
  res.json({numero,cadena});
}



//eliminar n imagenes
const eliminarImagenesANivelFisico = async (imagenes:Imagen[]) => {
  for (const imagen of imagenes) {
    await cloudinary.uploader.destroy(imagen.id_generado);
  }
}

const crearComentarioConImagenes = async (comentario: IComentario) => {
    const nuevoComentario = await prismaClient.comentario.create({
      data: {
        idUsuario:comentario.idUsuario,
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

const parsearAImagenCloudinary = (imagenes: Express.Multer.File[]) => {
  console.log(`imagenes: ${imagenes}`);
  //  console.log('LLegue hasta el antes del imagenes Data')
  const imagenesData = imagenes.map((file) => ({
    id_generado: file.filename, // Cloudinary genera un ID único, a diferencia de JAVA
    nombre: file.originalname,
    enlace: (file as any).path.toString(), // La URL de Cloudinary
  }));
  return imagenesData;
};

const esPuntajeValido = (puntaje: number) =>{
    return puntaje >= 0 && puntaje <= 5;
}
