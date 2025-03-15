import express, { Express,request,response } from "express";
import { PORT } from "./secrets";
import { PrismaClient } from "@prisma/client";
import rootRouter from "./routes";
//importamos express
const app: Express = express();

//para las request que tengan un formato json
app.use(express.json());

//ruta principal clave
app.use('/api',rootRouter);


//instancia prismaClient que se utilizara en el controlador 
export const prismaClient = new PrismaClient({
    log: ["query"]
})
//esuchamos el puerto
app.listen(PORT,() =>{
    console.log(`app is running on http://localhost:${PORT}`);
})
