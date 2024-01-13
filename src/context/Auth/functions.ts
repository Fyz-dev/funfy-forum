'use client';

import {
  AuthError,
  AuthResponse,
  AuthTokenResponse,
  OAuthResponse,
} from '@supabase/supabase-js';
import { createBrowserClient } from 'src/utils/supabase/client';

export type TSignIn = OAuthResponse | AuthTokenResponse;
export type TSignUp = AuthResponse;
export type TLogOut = {
  error: AuthError | null;
};

export const signInGoogle = async (redirectTo: string): Promise<TSignIn> => {
  return createBrowserClient().auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: redirectTo,
    },
  });
};

export const signInGithub = async (redirectTo: string): Promise<TSignIn> => {
  return createBrowserClient().auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: redirectTo,
    },
  });
};

export const signInEmailAndPassword = async (
  email: string,
  password: string,
): Promise<TSignIn> => {
  return createBrowserClient().auth.signInWithPassword({
    email: email,
    password: password,
  });
};

export const signUpEmailAndPassword = async (
  name: string,
  email: string,
  password: string,
): Promise<TSignUp> => {
  return createBrowserClient().auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        full_name: name,
      },
    },
  });
};

export const logOut = async (): Promise<TLogOut> => {
  return createBrowserClient().auth.signOut();
};
