import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from './cloudinary';

const storage = new CloudinaryStorage({
  cloudinary,//utilizamos la configuracion de cloudinary que definimos en el otro archivo
  params: async (req,file) => ({
    folder: "comentarios",// carpeta en cloudinary donde se guardara las imagenes
    format: file.mimetype.split('/')[1], //extraer la extension del archivo como jpg o png, etc
    allower_formats: ["jpg", "png", "jpeg"], //formatos permitidos, parece no funcionar
    transformation: [{ width: 500, height: 500, crop: "limit" }], // redimenciona la imagen antes de subirla
  })
});  

const upload = multer({storage});

//exporto la funcion upload para usarlo como middleware
export default upload;