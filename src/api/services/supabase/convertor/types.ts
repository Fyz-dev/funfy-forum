import { Tables } from 'src/types';
import { RemoveNullExcept } from 'src/utils';

export type TablePost = Tables<'posts'> & { topics: Tables<'topics'> } & {
  users: Tables<'users'>;
};

type TableCommentLinear = Omit<Tables<'comment_linear'>, 'posts' | 'users'>;

export type TableCommentWithPost = TableCommentLinear & {
  posts: TablePost;
} & {
  users: Tables<'users'>;
};

export type TableCommentWithPostWithoutNull = RemoveNullExcept<
  TableCommentWithPost,
  'parent_comment_id'
>;
