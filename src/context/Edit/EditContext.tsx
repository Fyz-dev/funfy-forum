'use client';

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';

type EditContextPops = {
  isEdit: boolean;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
};

const EditContext = createContext<EditContextPops>({} as EditContextPops);

export const EditContextProvider = ({ children }: { children?: ReactNode }) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);

  return (
    <EditContext.Provider
      value={{
        isEdit: isEdit,
        setIsEdit: setIsEdit,
      }}
    >
      {children}
    </EditContext.Provider>
  );
};

export const useEditContext = () => useContext(EditContext);
