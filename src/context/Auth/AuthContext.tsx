'use client';

import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { IUser } from 'src/interface';
import { createBrowserClient } from 'src/utils/supabase/client';
import {
  TSignIn,
  TSignUp,
  logOut as logOutFC,
  signInEmailAndPassword,
  signInGithub,
  signInGoogle,
  signUpEmailAndPassword,
} from './functions';
import { useRouter } from 'next/navigation';
import { getUserById } from 'src/api/supabase';

type UserAuthType = IUser | null;
type AuthContextPops = {
  user: UserAuthType;
  signInGoogle(): Promise<TSignIn>;
  signInGithub(): Promise<TSignIn>;
  signInEmailAndPassword(email: string, password: string): Promise<TSignIn>;
  signUpEmailAndPassword(
    name: string,
    email: string,
    password: string,
  ): Promise<TSignUp>;
  logOut(): Promise<void>;
};
const AuthContext = createContext<AuthContextPops>({
  user: null,
  signInGoogle: signInGoogle,
  signInGithub: signInGithub,
  signInEmailAndPassword: signInEmailAndPassword,
  signUpEmailAndPassword: signUpEmailAndPassword,
  logOut: async () => {},
});

export const AuthContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserAuthType>(null);
  const router = useRouter();

  const logOut = async () => {
    await logOutFC();
    setUser(null);
    router.refresh();
  };

  useEffect(() => {
    const getUserData = async () => {
      const session = await createBrowserClient().auth.getSession();

      if (!session.data.session) {
        setUser(null);
        return;
      }

      setUser(await getUserById(session.data.session.user.id));
    };

    getUserData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signInGoogle,
        signInGithub,
        signInEmailAndPassword,
        signUpEmailAndPassword,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
