'use client';

import { useDisclosure } from '@nextui-org/react';
import { FC, ReactNode, createContext, useContext, useState } from 'react';
import Authorization, {
  EnumModeAuth,
  ModeAuth,
} from 'src/components/Authorization';

type ModalAuthContextPops = {
  isOpen: boolean;
  onOpen: (openMode: ModeAuth) => void;
};

const ModalAuthContext = createContext<ModalAuthContextPops>(
  {} as ModalAuthContextPops,
);

export const ModalAuthContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [mode, setMode] = useState<ModeAuth>(EnumModeAuth.LOGIN);

  const handlerOpen = (openMode: ModeAuth) => {
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
