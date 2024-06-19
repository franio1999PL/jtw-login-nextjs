import { z } from 'zod';

export const SignupFormSchema = z.object({
  name: z.string().min(6),
  email: z.string().email(),
  password: z.string().min(6),
});
