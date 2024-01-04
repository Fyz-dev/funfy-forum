'use client';

import { FC, ReactNode } from 'react';
import { useAuth } from 'src/context/Auth';

const OnlyAuthor: FC<{ idAuthor: string; children: ReactNode }> = ({
  idAuthor,
  children,
}) => {
  const { user } = useAuth();

  if (user?.uid === idAuthor) return <>{children}</>;

  return null;
};

export default OnlyAuthor;
