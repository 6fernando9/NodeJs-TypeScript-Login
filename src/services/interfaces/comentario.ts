export interface IImagen {
    id_generado: string,
    nombre: string,
    enlace: string,
}

export interface IComentario {
    idUsuario: number,
    puntaje: number,
    descripcion: string,
    imagenes?: IImagen[] 
}