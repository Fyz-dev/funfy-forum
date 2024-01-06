'use server';

import { createServerClient } from 'src/utils/supabase/server';
import { toTopic } from '../convertor';
import { ITopic } from 'src/interface';
import { CreateTopicDTO } from 'src/api/dto';
import { UpdateTopicDTO } from 'src/api/dto/UpdateTopicDTO';

export const getTopicById = async (id: string): Promise<ITopic> => {
  const { data } = await createServerClient()
    .from('topics')
    .select(`*`)
    .eq('id', id)
    .maybeSingle();

  if (data) return toTopic(data);

  throw new Error('Not find topic');
};

export const searchTopicsByName = async (text: string): Promise<ITopic[]> => {
  const { data, error } = await createServerClient()
    .from('topics')
    .select(`*`)
    .ilike('name', `%${text}%`)
    .limit(8);

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

  if (error) console.log(error);
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
