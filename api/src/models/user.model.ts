import { z } from 'zod'

export const UserSchema = z.object({
  id: z.number({ coerce: true }).min(1).optional(),
  created_at: z.string().date().optional(),
  updated_at: z.string().date().optional(),
  name: z.string().min(1).max(32),
  city: z.string().min(1).max(32),
})

export type User = z.infer<typeof UserSchema>
