import {z} from 'zod';

export const ComentarioSchema = z.object({
    //puntaje: z.number().min(0,"Minimo 0 de puntaje").max(5,"Maximo 5 de puntaje"),
    puntaje: z.string(),
    descripcion: z.string(),
})

