import express, { Express,request,response } from "express";
import { PORT } from "./secrets";

//importamos express
const app: Express = express();

//para las request que tengan un formato json
app.use(express.json());

//esuchamos el puerto
app.listen(PORT,() =>{
    console.log(`app is running on http://localhost:${PORT}`);
})
