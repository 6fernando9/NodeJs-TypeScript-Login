import { NextFunction, Request, Response } from "express";
import { CreatePermissionSchema } from "../schemas/permiso-schema";
import { prismaClient } from "..";
import { BadRequestException } from "../exceptions/bad-request";
import { ErrorCode } from "../exceptions/root";
import { NotFoundException } from "../exceptions/not-found";


export const createPermission =async (req: Request, res: Response,next: NextFunction) => {
    try {
        const validatedData = CreatePermissionSchema.parse(req.body);
        const permission = await prismaClient.permiso.create({
          data: {
            nombre: validatedData.nombre
          },
        });
        res.json({permission, message:"permiso creado con exito"})
    } catch (error) {
        throw new BadRequestException("Error Formato de Permiso no valido",ErrorCode.PERMISO_FORMATO_NO_VALIDO);
    }
}

export const updatePermission = async (req: Request, res: Response,next: NextFunction) => {
    try {
        const validatedData = CreatePermissionSchema.parse(req.body);
        const permission = await prismaClient.permiso.update({
          where:{id: +req.params.id},
          data: {
            nombre: validatedData.nombre,
          },
        });
        res.json({ permission, message: "permiso actualizado con exito" });
    } catch (error) {
        throw new BadRequestException("Error Formato de Permiso no valido",ErrorCode.PERMISO_FORMATO_NO_VALIDO);
    }
}

export const deletePermission = async (req: Request, res: Response,next: NextFunction) => {
        const permission =await prismaClient.permiso.findFirstOrThrow({
          where: { id: +req.params.id },
        });
        if(!permission){
            throw new NotFoundException("Error Formato de Permiso no valido",ErrorCode.PERMISO_NOT_FOUND);
        }
        await prismaClient.permiso.delete({
          where:{id: permission.id},
        });

        res.json({ message: "permiso eliminado con exito" });
}

export const listAllPermission = async (req: Request, res: Response,next: NextFunction) => {
    res.json(await prismaClient.permiso.findMany());
}
