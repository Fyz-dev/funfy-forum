'use client';

import {
  GoogleAuthProvider,
  GithubAuthProvider,
  onAuthStateChanged,
  signInWithRedirect,
  signOut,
} from 'firebase/auth';
import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { auth } from '../../../firebase';
import { User } from './Auth.type';

type AuthContextPops = {
  user: User;
  googleSignIn: () => Promise<void>;
  githubSignIn: () => Promise<void>;
  logOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextPops>({
  user: null,
  googleSignIn: async () => {},
  githubSignIn: async () => {},
  logOut: async () => {},
});

export const AuthContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User>(null);

  const googleSignIn = async (): Promise<void> => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  };

  const githubSignIn = async (): Promise<void> => {
    const provider = new GithubAuthProvider();
    signInWithRedirect(auth, provider);
  };

  const logOut = async (): Promise<void> => {
    signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser as User);
    });

    return () => unsubscribe();
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, googleSignIn, githubSignIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
