import { z } from 'zod'

export const searchSchema = z.object({
  searchInput: z
    .string()
    .min(2, 'O nome deve ter pelo menos 2 caracteres')
    .max(20, 'O nome deve ter no máximo 50 caracteres'),
})

export type SearchSchemaType = z.infer<typeof searchSchema>
