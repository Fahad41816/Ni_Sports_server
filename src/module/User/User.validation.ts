import { z } from 'zod'

export const UserValidationWithZod = z.object({
  name: z.string(),
  address: z.string(),
  email: z.string(),
  password: z.string(),
  phone: z.string(), 
})

export const UserLoginValidationWithZod = z.object({
  email: z.string(),
  password: z.string(),
})
