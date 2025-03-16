import {z} from 'zod'

export const CreatePermissionSchema = z.object({
    nombre:z.string()
});

export const UpdatePermissionSchema = z.object({
    id: z.number(),
   nombre: z.string(),
});