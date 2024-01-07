import { isNull } from 'src/utils';
import z from 'zod';

const nameValid = z.string().min(3);
const descriptionValid = z.string().max(300).optional();
const avatarValid = z.any().optional();

export const AuthSchema = z.object({
  name: nameValid.optional(),
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
  content: z.string().max(8000).optional(),
  topicID: z.string({
    errorMap: () => ({
      message: 'Required',
    }),
  }),
  isNSFW: z.boolean(),
});

export const TopicSchema = z.object({
  name: z.string().min(1, 'Required').max(21),
  description: descriptionValid,
  avatar: avatarValid, // As file
});

export const CommentSchema = z.object({
  comment: z.string().refine(value => !isNull(value), {
    message: 'Invalid data.',
  }),
});

export const ProfileSchema = z.object({
  name: nameValid,
  description: descriptionValid,
  avatar: avatarValid, // As file
});

export const SocialLinkSchema = z.object({
  displayName: z
    .string({
      errorMap: () => ({
        message: 'Required',
      }),
    })
    .max(20),
  url: z.string(),
});

export type AuthSchemaType = z.infer<typeof AuthSchema>;
export type PostSchemaType = z.infer<typeof PostSchema>;
export type TopicSchemaType = z.infer<typeof TopicSchema>;
export type CommentSchemaType = z.infer<typeof CommentSchema>;
export type ProfileSchemaType = z.infer<typeof ProfileSchema>;
