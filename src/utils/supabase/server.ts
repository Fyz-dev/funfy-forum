'use server';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { Database } from 'src/types';

// For server
export const createServerClient = () => {
  const cookieStore = cookies();

  return createServerComponentClient<Database>({ cookies: () => cookieStore });
};
