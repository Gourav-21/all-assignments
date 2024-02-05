import { string, z } from 'zod'

export const signupInput=z.object({
  username: z.string().min(1).max(10),
  password: z.string().min(6).max(15)
})

export type signuParmas= z.infer<typeof signupInput>
