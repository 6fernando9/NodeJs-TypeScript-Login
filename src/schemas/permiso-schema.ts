import {z} from 'zod'

export const CreatePermissionSchema = z.object({
    nombre:z.string()
})