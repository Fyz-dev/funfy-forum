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
  TLogOut,
  TSignIn,
  TSignUp,
  logOut as logOutFC,
  signInEmailAndPassword,
  signInGithub,
  signInGoogle,
  signUpEmailAndPassword,
} from './functions';
import { toUser } from 'src/api/services/supabase/convertor';
import { getUserById } from 'src/api/services/supabase/user';

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

  const logOut = () => logOutFC().then(() => setUser(null));

  useEffect(() => {
    const getUserData = async () => {
      const supabase = createBrowserClient();
      const user = await supabase.auth.getUser();

      if (!user.data.user) {
        setUser(null);
        return;
      }

      setUser(await getUserById(user.data.user.id));
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
