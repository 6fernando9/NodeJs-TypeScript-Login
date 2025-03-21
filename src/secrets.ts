import dotenv from 'dotenv'
import { Buffer } from 'buffer';
//equipamos del .env
dotenv.config({path: '.env'})
dotenv.config();

//exportamos el PORT de las variables de entorno
export const PORT = process.env.PORT;
// Convierte tu clave secreta a Base64
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY!;
export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;;