import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from 'src/types';

// For client
export const createBrowserClient = () =>
  createClientComponentClient<Database>();
