import { isNull } from 'src/utils';
import z from 'zod';

const avatar = () => z.any().optional();
const name = () =>
  z
    .string()
    .min(3)
    .max(32, 'Username must be at most 32 characters')
    .refine(value => /^[а-яА-ЯёЁіІїЇєЄa-zA-Z0-9_\s-]+$/.test(value), {
      message: 'Username can only contain letters, numbers, "-", and "_"',
    })
    .refine(value => /^[а-яА-ЯёЁіІїЇєЄa-zA-Z0-9_-]/.test(value), {
      message: 'Username cannot consist of only spaces',
    });

export const AuthSchema = z.object({
  name: name().optional(),
  email: z.string().email(),
  password: z
    .string()
    .min(8)
    .max(50, 'Password must be at most 50 characters')
    .refine(value => /[a-zA-Z]/.test(value), {
      message: 'The password must contain at least one letter.',
    })
    .refine(value => /\d/.test(value), {
      message: 'The password must contain at least one number.',
    }),
});

export const PostSchema = z.object({
  title: z
    .string()
    .min(1, 'Required')
    .max(300)
    .refine(value => !isNull(value), {
      message: 'Title cannot be empty',
    }),
  content: z.string().max(8000).optional(),
  topicID: z.string({
    errorMap: () => ({
      message: 'Required',
    }),
  }),
  isNSFW: z.boolean(),
});

export const TopicSchema = z.object({
  name: z
    .string()
    .min(1, 'Required')
    .max(21)
    .refine(value => /^[а-яА-ЯёЁіІїЇєЄa-zA-Z0-9_\s-]+$/.test(value), {
      message: 'Name can only contain letters, numbers, "-", and "_"',
    })
    .refine(value => /^[а-яА-ЯёЁіІїЇєЄa-zA-Z0-9_-]/.test(value), {
      message: 'Name cannot consist of only spaces',
    }),
  description: z.string().max(300).optional(),
  avatar: avatar(), // As file
});

export const CommentSchema = z.object({
  comment: z
    .string()
    .min(1, 'Required')
    .max(1500)
    .refine(value => !isNull(value), {
      message: 'Field cannot be empty',
    }),
});

export const CommentSchemaCreate = z.object({
  comment: z.string().min(1, 'Required').max(1500),
});

export const ProfileSchema = z.object({
  name: name(),
  description: z.string().max(300).optional(),
  avatar: avatar(), // As file
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
export type CommentSchemaCreateType = z.infer<typeof CommentSchemaCreate>;
export type ProfileSchemaType = z.infer<typeof ProfileSchema>;
