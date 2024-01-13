'use client';

import { useDisclosure } from '@nextui-org/react';
import { FC, ReactNode, createContext, useContext, useState } from 'react';
import Authorization from 'src/components/Authorization';
import { AuthMode } from 'src/enums';

type ModalAuthContextPops = {
  isOpen: boolean;
  onOpen: (openMode: AuthMode) => void;
};

const ModalAuthContext = createContext<ModalAuthContextPops>(
  {} as ModalAuthContextPops,
);

export const ModalAuthContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [mode, setMode] = useState<AuthMode>(AuthMode.LOGIN);

  const handlerOpen = (openMode: AuthMode) => {
    if (openMode !== mode) setMode(openMode);
    onOpen();
  };

  return (
    <ModalAuthContext.Provider value={{ isOpen, onOpen: handlerOpen }}>
      {children}
      <Authorization
        isOpen={isOpen}
        mode={mode}
        setMode={setMode}
        onOpenChange={onOpenChange}
      />
    </ModalAuthContext.Provider>
  );
};

export const useModalAuthContext = () => {
  return useContext(ModalAuthContext);
};
