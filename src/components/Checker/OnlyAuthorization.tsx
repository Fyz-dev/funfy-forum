'use client';

import { FC, ReactNode } from 'react';
import { useAuth } from 'src/context/Auth';

const OnlyAuthorization: FC<{
  children: ReactNode;
  elseRender?: ReactNode;
}> = ({ children, elseRender }) => {
  const { user } = useAuth();

  if (user) return <>{children}</>;

  return elseRender;
};

export default OnlyAuthorization;
