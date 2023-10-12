'use client';

import {
  GoogleAuthProvider,
  GithubAuthProvider,
  onAuthStateChanged,
  signInWithRedirect,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
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
  emailAndPasswordSignIn: (email: string, password: string) => Promise<any>;
  createUserWithEmail: (email: string, password: string) => Promise<any>;
  logOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextPops>({
  user: null,
  googleSignIn: async () => {},
  githubSignIn: async () => {},
  emailAndPasswordSignIn: async () => {},
  createUserWithEmail: async () => {},
  logOut: async () => {},
});

export const AuthContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User>(null);

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  };

  const githubSignIn = async () => {
    const provider = new GithubAuthProvider();
    signInWithRedirect(auth, provider);
  };

  const createUserWithEmail = async (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const emailAndPasswordSignIn = async (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = async () => {
    signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      console.log(currentUser);
      setUser(currentUser as User);
    });

    return () => unsubscribe();
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        googleSignIn,
        githubSignIn,
        emailAndPasswordSignIn,
        createUserWithEmail,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
