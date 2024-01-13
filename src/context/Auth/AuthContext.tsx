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
  signInGoogle(redirectTo: string): Promise<TSignIn>;
  signInGithub(redirectTo: string): Promise<TSignIn>;
  signInEmailAndPassword(email: string, password: string): Promise<TSignIn>;
  signUpEmailAndPassword(
    name: string,
    email: string,
    password: string,
  ): Promise<TSignUp>;
  logOut(): Promise<void>;
  updateData: () => void;
};
const AuthContext = createContext<AuthContextPops>({} as AuthContextPops);

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

  const getUserData = async () => {
    const session = await createBrowserClient().auth.getSession();

    if (!session.data.session) {
      setUser(null);
      return;
    }

    setUser(await getUserById(session.data.session.user.id));
  };

  useEffect(() => {
    const { data } = createBrowserClient().auth.onAuthStateChange(
      async (_, session) => {
        if (!session) {
          setUser(null);
          return;
        }

        setUser(await getUserById(session.user.id));
      },
    );

    getUserData();

    return data.subscription.unsubscribe();
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
        updateData: getUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
