
import { Usuario } from "@prisma/client"
import { Request } from "express";
declare module "express"{
    export interface Request {
        //export interface Request  {
            usuario ?: Usuario;
        //}
    }
}

// declare namespace Express {
//   export interface Request {
//     user?:Usuario
//   }
// }