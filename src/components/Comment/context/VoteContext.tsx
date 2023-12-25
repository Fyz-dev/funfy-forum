'use client';

import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';
import { VoteEnum } from 'src/enums';

interface VoteContextProps {
  vote: VoteEnum;
  setVote: Dispatch<SetStateAction<VoteEnum>>;
}

const VoteContext = createContext<VoteContextProps>({
  vote: 0,
  setVote: () => {},
});

export const VoteContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [vote, setVote] = useState<VoteEnum>(0);

  return (
    <VoteContext.Provider
      value={{
        vote,
        setVote,
      }}
    >
      {children}
    </VoteContext.Provider>
  );
};

export const useVote = () => {
  return useContext(VoteContext);
};
