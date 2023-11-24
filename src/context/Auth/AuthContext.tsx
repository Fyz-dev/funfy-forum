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
import { IUser } from 'src/interface';
import { auth, userService } from 'src/api/services/firebase';

type UserAuthType = IUser | null;

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
      if (currentUser === null) {
        setUser(null);
        return;
      }

      const { uid, displayName: name, email, photoURL } = currentUser;
      if (email)
        setUser({
          uid,
          name,
          email,
          photoURL,
          isBlocked: false,
        });
    });

    getRedirectResult(auth).then(value => {
      if (value === null) return;

      const { uid, displayName: name, email, photoURL } = value.user;
      if (email)
        userService.add({ uid, name, email, photoURL, isBlocked: false });
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
