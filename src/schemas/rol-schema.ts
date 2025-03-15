import { z } from 'zod'

// estructura
// export const UpperCaseSchema = z.object({})
export const CreateRolSchema = z.object({
    nombre: z.string()
})
