"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CLOUDINARY_API_SECRET = exports.CLOUDINARY_API_KEY = exports.CLOUDINARY_CLOUD_NAME = exports.JWT_SECRET_KEY = exports.PORT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
//equipamos del .env
dotenv_1.default.config({ path: '.env' });
dotenv_1.default.config();
//exportamos el PORT de las variables de entorno
exports.PORT = process.env.PORT;
exports.JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
exports.CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
exports.CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
exports.CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
;
