import EventEmitter from "events";
import { prismaClient } from "..";
import { BitacoraUser } from "./interfaces/bitacora-user";
class UsuarioObserver extends EventEmitter{
    async agregarABitacoraDeUsuario(bitacoraUsuario: BitacoraUser){
        console.log('registrando usuario en la bitacora de usuarios..')
        const {usuarioId,nombre,tipo_sesion,ip} = bitacoraUsuario;
        const bitacoraCreada = await prismaClient.bitacora_usuario.create({
          data: {
            usuarioId,
            username:nombre,
            tipo_sesion,
            ip,
          },
        });

        console.log(`bitacora creada con exito ${bitacoraCreada}`);
    }
}


export const usuarioObserver = new UsuarioObserver();


usuarioObserver.on('registrarABitacoraDeUsuario', async(bitacoraUsuario: BitacoraUser) => {
    console.log(`se esta disparando el registrar bitacoras`);
    await usuarioObserver.agregarABitacoraDeUsuario(bitacoraUsuario);
})

// usuarioObserver.on('registrarLogin', async(bitacoraUsuario: BitacoraUser) => {
//     console.log(`se esta disparando el login bitacoras`);
//     await usuarioObserver.agregarABitacoraDeUsuario(bitacoraUsuario);
// })

// usuarioObserver.on("registrarLogout", async (bitacoraUsuario: BitacoraUser) => {
//   console.log(`se esta disparando el login bitacoras`);
//   await usuarioObserver.agregarABitacoraDeUsuario(bitacoraUsuario);
// });



