'use server';

import { IStats, IUser } from 'src/interface';
import { toStats, toUser } from '../convertor';
import { createServerClient } from 'src/utils/supabase/server';
import { UpdateUserDTO } from 'src/api/dto';

export const getUserById = async (id: string): Promise<IUser> => {
  const { data } = await createServerClient()
    .from('users')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (!data) throw new Error('Not find user');

  return toUser(data);
};

export const updateUser = async (user: UpdateUserDTO) => {
  const { error } = await createServerClient()
    .from('users')
    .update({
      name: user.name,
      description: user.description,
      photo_url: user.photoURL || null,
    })
    .eq('id', user.uid);

  if (error) console.log(error);
};

export const searchUsersByName = async (
  text: string,
  numberPage: number = 1,
  sizePage: number = 5,
) => {
  const count = numberPage * sizePage;

  const { data, error } = await createServerClient()
    .from('users')
    .select(`*`)
    .ilike('name', `%${text}%`)
    .range(count - sizePage, count - 1);

  if (!data) return [];
  if (error) console.log(error);

  return data.map(user => toUser(user));
};

export const getStatsByUser = async (
  id: string,
): Promise<IStats | undefined> => {
  const { data, error } = await createServerClient()
    .rpc('get_stats_by_user', {
      user_id_param: id,
    })
    .maybeSingle();

  if (error) console.log(error);

  return data ? toStats(data) : undefined;
};
