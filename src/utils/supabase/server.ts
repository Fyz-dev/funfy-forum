'use server';

import {
  createServerClient as createServerClientBase,
  type CookieOptions,
} from '@supabase/ssr';
import { cookies } from 'next/headers';
import { Database } from 'src/types';

// For server
export const createServerClient = () => {
  const cookieStore = cookies();

  return createServerClientBase<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (error) {
            console.log(error);
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options });
          } catch (error) {
            console.log(error);
          }
        },
      },
    },
  );
};
