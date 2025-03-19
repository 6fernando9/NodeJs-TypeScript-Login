export interface IImagen {
    id_generado: string,
    nombre: string,
    enlace: string,
}

export interface IComentario {
    puntaje: number,
    descripcion: string,
    imagenes?: IImagen[] 
}