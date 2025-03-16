import { NextFunction, Request, Response } from "express";
import { CreateRolSchema } from "../schemas/rol-schema";
import { prismaClient } from "..";
import { NotFoundException } from "../exceptions/not-found";
import { FoundException } from "../exceptions/found";
import { ErrorCode } from "../exceptions/root";
import { BadRequestException } from "../exceptions/bad-request";
import { UpdatePermissionSchema } from "../schemas/permiso-schema";

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


export const findRoleById = async (req: Request,res: Response,next: NextFunction) => {
    const rol = await prismaClient.rol.findUnique({
        where: {id: +req.params.id},
        include:{
            permisos: true
        }
    })
    if(!rol){
        throw new NotFoundException("Error Rol No encontrado..",ErrorCode.ROL_NO_ENCONTRADO);
    }
    res.json(rol);
}

//http://localhost:3000/api/rol/1
//le enviaremos un objeto permiso

//ejemplo
//rol: ADMIN
//permisos: add user, edit user
//el json tendra un objeto permiso
export const addPermissionToRole = async (req: Request,res: Response,next: NextFunction) => {

    //capturamos el permiso que viene
    // const validatedData: any;
    try {
      //verificamos la entrada del permiso a agregar
      const validatedData = UpdatePermissionSchema.parse(req.body);
    } catch (error) {
      throw new BadRequestException(
        "Error...Formato no valido...",
        ErrorCode.PERMISO_FORMATO_NO_VALIDO
      );
    }
       const { id } = req.body;
        //console.log(validatedData)
        const existePermisoEnBd = await prismaClient.permiso.findFirst({
            where:{id}
        })
        if(!existePermisoEnBd){
            throw new NotFoundException("Error..Permiso no Encontrado...",ErrorCode.PERMISO_NOT_FOUND);
        }
       // console.log(validatedData);
          // Validamos el ID del rol
        //verificamos si existe el permiso a agregar
        const existePermisoAsignadoAlRol = await prismaClient.rol.findFirst({
            where:{
                id: +req.params.id,
                permisos:{
                    some: {id}
                }
            }
        })

        //si existe entonces no podemos duplicar el mismo permiso
        if(existePermisoAsignadoAlRol){
            throw new FoundException("Error..El Permiso ya esta registrado en el sistema..", ErrorCode.PERMISO_YA_REGISTRADO);
        }

        //si no existe el permiso entonces lo agregamos
        console.log('llege antes de actualizar')
        const createPermissionToRol = await prismaClient.rol.update({
            where:{
                id: +req.params.id
            },
            data:{
                permisos:{
                    connect: [{id}]//solo se requiere el id, no el objeto entero
                }
            },
            include:{
                permisos:true
            }
        })

        res.json(createPermissionToRol);
  
}

export const deletePermissionToRole = async (req: Request,res: Response,next: NextFunction) => {

    //capturamos el permiso que viene
    try {
        //verificamos si existe el permiso a agregar
        const existsPermission = await prismaClient.permiso.findFirst({
            where:{id: +req.params.id}
        })

        //si existe entonces no podemos duplicar el mismo permiso
        if(!existsPermission){
            throw new NotFoundException("Error..permiso no encontrado..", ErrorCode.PERMISO_NOT_FOUND);
        }
        //si no existe el permiso entonces lo agregamos
        
        const {id} = req.body;
        await prismaClient.rol.update({
            where:{
                id: +req.params.id
            },
            data:{
                permisos:{
                    disconnect:[{id}]
                }
            }
        })
        res.json({message: "Permiso Eliminado con exito"});
    } catch (error) {
        throw new BadRequestException("Error...Formato no valido...",ErrorCode.PERMISO_FORMATO_NO_VALIDO);
    }
}