"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prismaClient = void 0;
const express_1 = __importDefault(require("express"));
const secrets_1 = require("./secrets");
const client_1 = require("@prisma/client");
const routes_1 = __importDefault(require("./routes"));
const error_1 = require("./middlewares/error");
//importamos express
const app = (0, express_1.default)();
//para las request que tengan un formato json
app.use(express_1.default.json());
//ruta principal clave
app.use('/api', routes_1.default);
//usar el middleweare
app.use(error_1.errorMiddleware);
//para el proxy y capturar ip
// app.set("trust proxy", true); 
//instancia prismaClient que se utilizara en el controlador 
exports.prismaClient = new client_1.PrismaClient({
    log: ["query"]
});
//esuchamos el puerto
app.listen(secrets_1.PORT, () => {
    console.log(`app is running on http://localhost:${secrets_1.PORT}`);
});
