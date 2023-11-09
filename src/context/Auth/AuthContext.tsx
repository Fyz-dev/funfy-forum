'use client';

import {
  GoogleAuthProvider,
  GithubAuthProvider,
  onAuthStateChanged,
  signInWithRedirect,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getRedirectResult,
  sendEmailVerification,
} from 'firebase/auth';
import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { User } from 'src/models';
import { auth, userService } from 'src/services/firebase';

type UserAuthType = User | null;

type AuthContextPops = {
  user: UserAuthType;
  signInGoogle(): Promise<void>;
  signInGithub(): Promise<void>;
  signInEmailAndPassword(email: string, password: string): Promise<any>;
  createUserWithEmail(email: string, password: string): Promise<any>;
  sendEmailVerify(): Promise<void>;
  logOut(): Promise<void>;
};

export const AuthContext = createContext<AuthContextPops>({
  user: null,
  signInGoogle: async () => {},
  signInGithub: async () => {},
  signInEmailAndPassword: async () => {},
  createUserWithEmail: async () => {},
  sendEmailVerify: async () => {},
  logOut: async () => {},
});

export const AuthContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserAuthType>(null);

  const signInGoogle = async () => {
    signInWithRedirect(auth, new GoogleAuthProvider());
  };

  const signInGithub = async () =>
    signInWithRedirect(auth, new GithubAuthProvider());

  const createUserWithEmail = async (email: string, password: string) =>
    createUserWithEmailAndPassword(auth, email, password);

  const signInEmailAndPassword = async (email: string, password: string) =>
    signInWithEmailAndPassword(auth, email, password);

  const sendEmailVerify = async () => {
    if (auth.currentUser)
      sendEmailVerification(auth.currentUser, {
        url: 'https://funfy-forum.vercel.app/',
      });
  };

  const logOut = async () => signOut(auth);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      if (currentUser !== null) {
        const { uid, displayName, email, photoURL } = currentUser;
        setUser(new User(uid, displayName, email, photoURL));
      } else {
        setUser(null);
      }
    });

    getRedirectResult(auth).then(value => {
      console.log(`DEBUG LOG getRedirectResult ${value}`);

      if (value === null) return;

      const { uid, displayName, email, photoURL } = value.user;
      userService.add(new User(uid, displayName, email, photoURL));
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signInGoogle,
        signInGithub,
        signInEmailAndPassword,
        createUserWithEmail,
        sendEmailVerify,
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
