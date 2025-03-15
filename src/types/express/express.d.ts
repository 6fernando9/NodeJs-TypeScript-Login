import { Usuario } from "@prisma/client";
import * as express from "express"
declare global{
    namespace Express {
        export interface Request {
            usuario ?: Usuario
        }
    }
}