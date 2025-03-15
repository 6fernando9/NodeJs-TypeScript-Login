import { NextFunction, Request, Response } from "express";
import { CreateRolSchema } from "../schemas/rol-schema";
import { prismaClient } from "..";

export const createRol = async (req: Request,res: Response,next: NextFunction) => {

    //validamos los datos del rol, con el esquema de validacion
    const validatedData = CreateRolSchema.parse(req.body);
    const { nombre } = req.body;

    //creamos el rol
    const createRol = await prismaClient.rol.create({
        data:{ nombre}
    })
    res.json(createRol);
}

export const updateRol = async (req: Request,res: Response,next: NextFunction) => {
  //validamos los datos del rol, con el esquema de validacion
  const validatedData = CreateRolSchema.parse(req.body);
  const { nombre } = req.body;
  const updatedRole = await prismaClient.rol.update({
    where:{
        id: +req.params.id
    },
    data:{
        nombre
    }
  })
  res.json(updatedRole);
}

export const getAllRoles = async (req: Request,res: Response,next: NextFunction) => {
    const roleList = await prismaClient.rol.findMany();
    res.json(roleList);
}

export const deleteRol =  async (req: Request,res: Response,next: NextFunction) => {
    await prismaClient.rol.delete({
        where:{
            id: +req.params.id
        }
    })
    res.json({success: "Rol Eliminado con Exito"})
}