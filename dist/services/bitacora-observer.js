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
exports.usuarioObserver = void 0;
const events_1 = __importDefault(require("events"));
const __1 = require("..");
class UsuarioObserver extends events_1.default {
    agregarABitacoraDeUsuario(bitacoraUsuario) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('registrando usuario en la bitacora de usuarios..');
            const { usuarioId, nombre, tipo_sesion, ip } = bitacoraUsuario;
            const bitacoraCreada = yield __1.prismaClient.bitacora_usuario.create({
                data: {
                    usuarioId,
                    username: nombre,
                    tipo_sesion,
                    ip,
                },
            });
            console.log(`bitacora creada con exito ${bitacoraCreada}`);
        });
    }
}
exports.usuarioObserver = new UsuarioObserver();
exports.usuarioObserver.on('registrarABitacoraDeUsuario', (bitacoraUsuario) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`se esta disparando el registrar bitacoras`);
    yield exports.usuarioObserver.agregarABitacoraDeUsuario(bitacoraUsuario);
}));
// usuarioObserver.on('registrarLogin', async(bitacoraUsuario: BitacoraUser) => {
//     console.log(`se esta disparando el login bitacoras`);
//     await usuarioObserver.agregarABitacoraDeUsuario(bitacoraUsuario);
// })
// usuarioObserver.on("registrarLogout", async (bitacoraUsuario: BitacoraUser) => {
//   console.log(`se esta disparando el login bitacoras`);
//   await usuarioObserver.agregarABitacoraDeUsuario(bitacoraUsuario);
// });
