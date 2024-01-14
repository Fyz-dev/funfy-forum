'use server';

import { createServerClient } from 'src/utils/supabase/server';
import { toStats, toTopic } from '../convertor';
import { IStats, ITopic } from 'src/interface';
import { CreateTopicDTO } from 'src/api/dto';
import { UpdateTopicDTO } from 'src/api/dto/UpdateTopicDTO';
import { TSortTopic } from 'src/types';

export const getTopics = async (
  sort: TSortTopic,
  numberPage: number = 1,
  sizePage: number = 5,
) => {
  const count = numberPage * sizePage;
  const { data, error } = await createServerClient()
    .from('topics')
    .select(`*`)
    .range(count - sizePage, count - 1)
    .order('created_at', { ascending: !(sort === 'new') });

  if (error) console.log(error);

  return data ? data.map(item => toTopic(item)) : [];
};

export const getTopicById = async (id: string): Promise<ITopic> => {
  const { data } = await createServerClient()
    .from('topics')
    .select(`*`)
    .eq('id', id)
    .maybeSingle();

  if (data) return toTopic(data);

  throw new Error('Not find topic');
};

export const searchTopicsByName = async (
  text: string,
  numberPage: number = 1,
  sizePage: number = 5,
): Promise<ITopic[]> => {
  const count = numberPage * sizePage;
  const { data, error } = await createServerClient()
    .from('topics')
    .select(`*`)
    .ilike('name', `%${text}%`)
    .range(count - sizePage, count - 1);

  if (error) console.log(error);

  return data ? data.map(item => toTopic(item)) : [];
};

export const createTopic = async (topic: CreateTopicDTO) => {
  const { error } = await createServerClient().from('topics').insert({
    name: topic.name,
    description: topic.description,
    photo_url: topic.photoURL,
    user_id: topic.userID,
  });

  return error;
};

export const updateTopic = async (topic: UpdateTopicDTO) => {
  const { error } = await createServerClient()
    .from('topics')
    .update({
      name: topic.name,
      description: topic.description,
      photo_url: topic.photoURL,
    })
    .eq('id', topic.topicId);

  if (error) console.log(error);
};

export const getStatsByTopic = async (
  id: string,
): Promise<IStats | undefined> => {
  const { data, error } = await createServerClient()
    .rpc('get_stats_by_topic', {
      topic_id_param: id,
    })
    .maybeSingle();

  if (error) console.log(error);

  return data ? toStats(data) : undefined;
};
