'use server';

import { IUser } from 'src/interface';
import { toUser } from './convertor';
import { createServerClient } from 'src/utils/supabase/server';

export const getUserById = async (id: string): Promise<IUser> => {
  const { data } = await createServerClient()
    .from('users')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (!data) throw new Error('Not find user');

  return toUser(data);
};
