"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = require("cloudinary");
const secrets_1 = require("../secrets");
///aqui solo defino las variables de entorno necesarias para el cloudinary
//dotenv.config();
cloudinary_1.v2.config({
    cloud_name: secrets_1.CLOUDINARY_CLOUD_NAME,
    api_key: secrets_1.CLOUDINARY_API_KEY,
    api_secret: secrets_1.CLOUDINARY_API_SECRET
});
exports.default = cloudinary_1.v2;
