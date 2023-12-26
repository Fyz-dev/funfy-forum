import { isNull } from 'src/utils';
import z from 'zod';

export const AuthSchema = z.object({
  name: z.string().min(3).optional(),
  email: z.string().email().min(4),
  password: z
    .string()
    .min(8)
    .refine(value => /[a-zA-Z]/.test(value), {
      message: 'The password must contain at least one letter.',
    })
    .refine(value => /\d/.test(value), {
      message: 'The password must contain at least one number.',
    }),
});

export const PostSchema = z.object({
  title: z.string().min(1).max(300),
  content: z.string().max(5000).optional(),
  topicID: z.string({
    errorMap: () => ({
      message: 'Required',
    }),
  }),
  isNSFW: z.boolean(),
});

export const TopicSchema = z.object({
  name: z.string().min(1, 'Required').max(21),
  description: z.string().max(300).optional(),
});

export const CommentSchema = z.object({
  comment: z.string().refine(value => !isNull(value), {
    message: 'Invalid data.',
  }),
});

export type AuthSchemaType = z.infer<typeof AuthSchema>;
export type PostSchemaType = z.infer<typeof PostSchema>;
export type TopicSchemaType = z.infer<typeof TopicSchema>;
export type CommentSchemaType = z.infer<typeof CommentSchema>;
