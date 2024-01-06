'use server';

import { IPost, IPosts } from 'src/interface';
import { TSortPost } from 'src/types';
import { createServerClient } from 'src/utils/supabase/server';
import { toPost } from '../convertor';
import { TablePost } from '../convertor/types';
import { CreatePostDTO, UpdatePostDTO } from 'src/api/dto';

// ------ utils ------ //
const getCountComments = async (data: TablePost[]): Promise<TablePost[]> => {
  const { data: postCountComments } = await createServerClient().rpc(
    'get_comment_count',
    { post_ids: data.map(item => item.id) },
  );

  return data.map(item => {
    return {
      ...item,
      countComments:
        postCountComments?.find(count => count.post_id === item.id)
          ?.countComments || 0,
    };
  });
};
// ------------------- //

export const getPosts = async (sort: TSortPost): Promise<IPosts> => {
  const { data, error } = await createServerClient()
    .from('posts')
    .select(`*, users(*), topics(*)`)
    .order('created_at', { ascending: !(sort === 'new') });

  if (!data) return [];
  if (error) console.log(error);

  const posts = await getCountComments(
    data.filter(
      item => item.users !== null && item.topics !== null,
    ) as TablePost[],
  );

  return posts.map(item => toPost(item));
};

export const getPostById = async (id: string): Promise<IPost> => {
  const { data } = await createServerClient()
    .from('posts')
    .select(`*, users(*), topics(*)`)
    .eq('id', id)
    .maybeSingle();

  if (data && data.users && data.topics) {
    const posts = await getCountComments([data] as TablePost[]);

    return toPost(posts[0]);
  }

  throw new Error('Not find post');
};

export const getPostsByUser = async (
  id: string,
  sort: TSortPost,
): Promise<IPosts> => {
  const { data, error } = await createServerClient()
    .from('posts')
    .select(`*, users(*), topics(*)`)
    .eq('user_id', id)
    .order('created_at', { ascending: !(sort === 'new') });

  if (!data) return [];
  if (error) console.log(error);

  const posts = await getCountComments(
    data.filter(
      item => item.users !== null && item.topics !== null,
    ) as TablePost[],
  );

  return posts.map(item => toPost(item));
};

export const getPostsByTopic = async (
  id: string,
  sort: TSortPost,
): Promise<IPosts> => {
  const { data, error } = await createServerClient()
    .from('posts')
    .select(`*, users(*), topics(*)`)
    .eq('topic_id', id)
    .order('created_at', { ascending: !(sort === 'new') });

  if (!data) return [];
  if (error) console.log(error);

  const posts = await getCountComments(
    data.filter(
      item => item.users !== null && item.topics !== null,
    ) as TablePost[],
  );

  return posts.map(item => toPost(item));
};

export const createPost = async (post: CreatePostDTO) => {
  const { error } = await createServerClient().from('posts').insert({
    title: post.title,
    content: post.content,
    user_id: post.userID,
    topic_id: post.topicID,
    is_nsfw: post.isNSFW,
  });

  if (error) console.log(error);
};

export const updatePost = async (post: UpdatePostDTO) => {
  const { error } = await createServerClient()
    .from('posts')
    .update({ title: post.title, content: post.content })
    .eq('id', post.id);

  if (error) console.log(error);
};

export const searchPostByTitle = async (text: string) => {
  const { data, error } = await createServerClient()
    .from('posts')
    .select(`*, users(*), topics(*)`)
    .ilike('title', `%${text}%`);

  if (!data) return [];
  if (error) console.log(error);

  const posts = await getCountComments(
    data.filter(
      item => item.users !== null && item.topics !== null,
    ) as TablePost[],
  );

  return posts.map(item => toPost(item));
};
