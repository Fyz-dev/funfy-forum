import { createBrowserClient as createBrowserClientBase } from '@supabase/ssr';
import { Database } from 'src/types';

// For client
export const createBrowserClient = () =>
  createBrowserClientBase<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
