'use client';

import { Dispatch, FC, ReactNode, SetStateAction, useEffect } from 'react';
import { UpVote, DownVote } from 'src/assets/icons';
import { Button as ButtonNext } from '@nextui-org/button';
import { VoteEnum } from 'src/enums';
import { useVote } from '../context/VoteContext';

const Button: FC<{
  typeVote: VoteEnum;
  vote: VoteEnum | null;
  setVote: Dispatch<SetStateAction<VoteEnum>>;
  children: ReactNode;
}> = ({ typeVote, vote, setVote, children }) => {
  const defaultStyleButton = 'bg-transparent p-0 text-default-600';
  const voteStyleButton = defaultStyleButton + ' text-primary';

  return (
    <ButtonNext
      radius="full"
      className={vote === typeVote ? voteStyleButton : defaultStyleButton}
      // h-unit-8 min-h-unit-8 w-unit-8 min-w-unit-8
      isIconOnly
      onClick={() => {
        if (vote === typeVote) {
          setVote(0);
          return;
        }
        setVote(typeVote);
      }}
    >
      {children}
    </ButtonNext>
  );
};

export type ButtonVoteProps = {
  voteCount: number;
  userVote: VoteEnum;
  className?: string;
};

const ButtonVote: FC<ButtonVoteProps> = ({
  voteCount,
  userVote,
  className = '',
}) => {
  const { vote, setVote } = useVote();

  const styleIcon = { style: { height: '1.5rem', width: '1.5rem' } };

  useEffect(() => {
    setVote(userVote);

    //eslint-disable-next-line
  }, [userVote]);

  return (
    <div className={`flex items-center ${className}`}>
      <Button typeVote={VoteEnum.UP} setVote={setVote} vote={vote}>
        <UpVote {...styleIcon} />
      </Button>
      <span className={`text-small ${vote !== 0 && 'text-primary'}`}>
        {voteCount - userVote + vote}
      </span>
      <Button typeVote={VoteEnum.DOWN} setVote={setVote} vote={vote}>
        <DownVote {...styleIcon} />
      </Button>
    </div>
  );
};

export default ButtonVote;
