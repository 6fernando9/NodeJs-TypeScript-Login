import dotenv from 'dotenv'
//equipamos del .env
dotenv.config({path: '.env'})

//exportamos el PORT de las variables de entorno
export const PORT = process.env.PORT;