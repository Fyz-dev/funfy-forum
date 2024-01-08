import { Database, Tables } from 'src/types';
import { RemoveNullExcept } from 'src/utils';

export type TablePost = Tables<'posts'> & { topics: Tables<'topics'> } & {
  users: Tables<'users'>;
} & { countComments?: number };

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

export type TreeComment = {
  children: TreeComment[];
  data: RemoveNullExcept<Tables<'comment_tree'>> & { users: Tables<'users'> };
};

export type TableTopicStats =
  Database['public']['Functions']['get_stats_by_topic']['Returns'][number];

export type TableUserStats =
  Database['public']['Functions']['get_stats_by_user']['Returns'][number];
