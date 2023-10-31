import z from 'zod';

export const AuthSchema = z.object({
  name: z.string().min(3).optional(),
  email: z.string().email().min(4),
  password: z
    .string()
    .min(8)
    .refine(value => /[a-zA-Z]/.test(value), {
      message: 'The password must contain at least one letter.',
    }),
});

export type AuthSchemaType = z.infer<typeof AuthSchema>;
