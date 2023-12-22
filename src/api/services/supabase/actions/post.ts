'use server';

import { IPost, IPosts } from 'src/interface';
import { TSortPost } from 'src/types';
import { createServerClient } from 'src/utils/supabase/server';
import { toPost } from '../convertor';
import { TablePost } from '../convertor/types';

export const getPosts = async (sort: TSortPost): Promise<IPosts> => {
  const { data, error } = await createServerClient()
    .from('posts')
    .select(`*, users(*), topics(*)`)
    .order('created_at', { ascending: !(sort === 'new') });

  if (error) console.log(error);

  return data
    ? data
        .filter(item => item.users !== null && item.topics !== null)
        .map(item => toPost(item as TablePost))
    : [];
};

export const getPostById = async (id: string): Promise<IPost> => {
  const { data } = await createServerClient()
    .from('posts')
    .select(`*, users(*), topics(*)`)
    .eq('id', id)
    .maybeSingle();

  if (data && data.users && data.topics) return toPost(data as TablePost);

  throw new Error('Not find post');
};

export const getPostsByUser = async (
  id: string,
  sort: TSortPost,
): Promise<IPosts | undefined> => {
  const { data, error } = await createServerClient()
    .from('posts')
    .select(`*, users(*), topics(*)`)
    .eq('user_id', id)
    .order('created_at', { ascending: !(sort === 'new') });

  if (error) console.log(error);

  return data
    ? data
        .filter(item => item.users !== null && item.topics !== null)
        .map(item => toPost(item as TablePost))
    : [];
};

export const getPostsByTopic = async (
  id: string,
  sort: TSortPost,
): Promise<IPosts | undefined> => {
  const { data, error } = await createServerClient()
    .from('posts')
    .select(`*, users(*), topics(*)`)
    .eq('topic_id', id)
    .order('created_at', { ascending: !(sort === 'new') });

  if (error) console.log(error);

  return data
    ? data
        .filter(item => item.users && item.topics)
        .map(item => toPost(item as TablePost))
    : [];
};
