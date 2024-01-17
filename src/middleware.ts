import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  let response = NextResponse.next();

  const { data } = await createMiddlewareClient({
    res: response,
    req: request,
  }).auth.getSession();

  if (!data.session?.user) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return response;
}

export const config = {
  matcher: [
    '/post/create',
    '/create/topic',
    '/settings/profile',
    '/topic/:id/edit',
  ],
};
