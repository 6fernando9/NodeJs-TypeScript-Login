import { compare, compareSync, hashSync } from "bcrypt";
import { prismaClient } from "..";
import { NextFunction, Request, Response } from "express";
import { JWT_SECRET_KEY } from "../secrets";
import * as jwt from 'jsonwebtoken'
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCode, Roles } from "../exceptions/root";
import { BadRequestException } from "../exceptions/bad-request";
import { FoundException } from "../exceptions/found";



//metodo de login
export const login = async (req: Request, res: Response,next: NextFunction) => {
  //destructuramos los datos
  const { email, password } = req.body;
  //lo buscamos al usuario por email
  let usuario = await prismaClient.usuario.findUnique({ where: { email } });
  if (!usuario) {
    next(new NotFoundException("Error Usuario No encontrado..",ErrorCode.USUARIO_NO_ENCONTRADO));
    return;
  }
  //comparamos contrasenias
  const passwordMatch = await compare(password,usuario.password);
  if (!passwordMatch) {
    next(new BadRequestException("Error contraseña Incorrecta",ErrorCode.INCORRECT_PASSWORD));
    return;
  }

  //si todo esta correcto entonces creamos el jwt con la firma 
  //aca podriamos meter los roles
  const token = jwt.sign(
    {
      sub: usuario.id,
      //faltaria roles y permisos guardarlo
    },
    JWT_SECRET_KEY
  );

  //le quitamos la contrasenia al usuario
  const { password: _, ...usuarioSinContra } = usuario
  res.json({message: `Bienvenido usuario ${usuarioSinContra.nombre}`
          , usuario: usuarioSinContra
          , token }); //devolvemos un json conformado por 2 objetos
};

//metodo de registro de usuarios
export const register = async (req: Request, res: Response,next: NextFunction) => {

  // capturamos los datos que vienen del request
  const { email ,nombre, password} = req.body;
  let usuario = await prismaClient.usuario.findUnique({
    where:{ email }
  })
  if(usuario){
    next(new FoundException("Error..usuario ya esta registrado en el sistema",ErrorCode.USUARIO_YA_REGISTRADO));
    return;
  }
  //si no existe entonces lo creamos

  //primero buscamos el rol por defecto
  const rol = await findRolByName(Roles.USUARIO);

  if(!rol){
    next(new NotFoundException("Error Rol No encontrado...",ErrorCode.ROL_NO_ENCONTRADO));
    return;
  }
  //creamos el usuario
  usuario = await prismaClient.usuario.create({
    data:{
      nombre,
      email,
      rolId: rol.id,
      password: hashSync(password, 10)
    }
  });

  //destructuramos para que retorne un objeto sin contrasenia
  const { password: __, ...usuarioSinPassword } = usuario;

  res.json(usuarioSinPassword);
}

const findRolByName = async (nombre: string) => {
  
  const rol = await prismaClient.rol.findFirst({
    where:{
      nombre
    }
  });
  return rol;
} 