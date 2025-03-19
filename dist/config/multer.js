"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const multer_storage_cloudinary_1 = require("multer-storage-cloudinary");
const cloudinary_1 = __importDefault(require("./cloudinary"));
const storage = new multer_storage_cloudinary_1.CloudinaryStorage({
    cloudinary: cloudinary_1.default, //utilizamos la configuracion de cloudinary que definimos en el otro archivo
    params: (req, file) => __awaiter(void 0, void 0, void 0, function* () {
        return ({
            folder: "comentarios", // carpeta en cloudinary donde se guardara las imagenes
            format: file.mimetype.split('/')[1], //extraer la extension del archivo como jpg o png, etc
            allower_formats: ["jpg", "png", "jpeg"], //formatos permitidos, parece no funcionar
            transformation: [{ width: 500, height: 500, crop: "limit" }], // redimenciona la imagen antes de subirla
        });
    })
});
const upload = (0, multer_1.default)({ storage });
//exporto la funcion upload para usarlo como middleware
exports.default = upload;
