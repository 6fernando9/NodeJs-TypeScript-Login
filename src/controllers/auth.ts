import { compare, hashSync } from "bcrypt";
import { prismaClient } from "..";
import { NextFunction, Request, Response } from "express";
import { JWT_SECRET_KEY } from "../secrets";
import * as jwt from 'jsonwebtoken'
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCode, Roles, TipoSesion } from "../exceptions/root";
import { BadRequestException } from "../exceptions/bad-request";
import { FoundException } from "../exceptions/found";
import { usuarioObserver } from "../services/bitacora-observer";
import { UnauthorizedException } from "../exceptions/unauthorized";
import { BitacoraUser } from "../services/interfaces/bitacora-user";



//metodo de login
export const login = async (req: Request, res: Response) => {
  //destructuramos los datos
  const { email, password } = req.body;
  //lo buscamos al usuario por email
  let usuario = await prismaClient.usuario.findUnique({ where: { email } });
  if (!usuario) {
    throw new NotFoundException("Error Usuario No encontrado..",ErrorCode.USUARIO_NO_ENCONTRADO);
  }
  //comparamos contrasenias
  const passwordMatch = await compare(password,usuario.password);
  if (!passwordMatch) {
    throw new BadRequestException("Error contraseña Incorrecta",ErrorCode.INCORRECT_PASSWORD);
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

   const ipUsuario: string = captureIpUser(req);
  console.log(`ip del usuario: ${ipUsuario}`)
  
  const bitacoraUser: BitacoraUser = createBitacoraUser(usuario.id,usuario.nombre,ipUsuario,TipoSesion.INICIO_SESION);
  //registramos el Inicio de sesion del usuario
  usuarioObserver.emit("registrarABitacoraDeUsuario", bitacoraUser);

  //le quitamos la contrasenia al usuario
  const { password: _, ...usuarioSinContra } = usuario

  res.json({message: `Bienvenido usuario ${usuarioSinContra.nombre}`
          , usuario: usuarioSinContra
          , token }); //devolvemos un json conformado por 2 objetos
};

//metodo de registro de usuarios
export const register = async (req: Request, res: Response,next: NextFunction) => {
  // capturamos los datos que vienen del request
  const { email, nombre, password } = req.body;
  let usuario = await prismaClient.usuario.findUnique({
    where: { email },
  });
  if (usuario) {
    next(
      new FoundException(
        "Error..usuario ya esta registrado en el sistema",
        ErrorCode.USUARIO_YA_REGISTRADO
      )
    );
  }
  //si no existe entonces lo creamos

  //primero buscamos el rol por defecto
  const rol = await findRolByName(Roles.USUARIO);

  if (!rol) {
    next(
      new NotFoundException(
        "Error Rol No encontrado...",
        ErrorCode.ROL_NO_ENCONTRADO
      )
    );
    return;
  }
  //creamos el usuario
  usuario = await prismaClient.usuario.create({
    data: {
      nombre,
      email,
      rolId: rol.id,
      password: hashSync(password, 10),
    },
  });
  const ipUsuario: string = captureIpUser(req);
  console.log(`ip del usuario: ${ipUsuario}`)

  const bitacoraUser: BitacoraUser = createBitacoraUser(usuario.id,usuario.nombre,ipUsuario,TipoSesion.REGISTRO_SESION);
  //registramos el registro de usuario en la bitacora
  usuarioObserver.emit("registrarABitacoraDeUsuario", bitacoraUser);

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

const captureIpUser = (req: Request): string => {
  let ipUsuario = req.ip;
  console.log(`req.ip: ${req.ip}`);
  // 📌 Si hay un proxy, tomar la IP real del usuario
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string") {
    ipUsuario = forwarded.split(",")[0]; // Extraer la primera IP real
  }
  if(!ipUsuario){
    throw new UnauthorizedException("Error Usuario Sin Ip",ErrorCode.USUARIO_SIN_IP);
  }
  return ipUsuario;
}

const createBitacoraUser = (usuarioId: number, nombre: string, ip: string, tipo_sesion: string): BitacoraUser => {
    const bitacoraUser: BitacoraUser = {
      usuarioId,nombre,ip,tipo_sesion
    }
    return bitacoraUser;
}