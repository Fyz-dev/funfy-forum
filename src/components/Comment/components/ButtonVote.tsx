'use client';

import { Dispatch, FC, ReactNode, SetStateAction, useState } from 'react';
import { UpVote, DownVote } from 'src/assets/icons';
import { Button as ButtonNext } from '@nextui-org/button';
import { VoteEnum } from 'src/enums';

const Button: FC<{
  typeVote: VoteEnum;
  vote: VoteEnum | null;
  setVote: Dispatch<SetStateAction<VoteEnum | null>>;
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
          setVote(null);
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
  className?: string;
};

const ButtonVote: FC<ButtonVoteProps> = ({ voteCount, className = '' }) => {
  const [vote, setVote] = useState<VoteEnum | null>(null);

  const styleIcon = { style: { height: '1.5rem', width: '1.5rem' } };

  return (
    <div className={`items-center ${className}`}>
      <Button typeVote={VoteEnum.UP} setVote={setVote} vote={vote}>
        <UpVote {...styleIcon} />
      </Button>
      <span className="text-small">
        {vote === null ? voteCount : voteCount + vote}
      </span>
      <Button typeVote={VoteEnum.DOWN} setVote={setVote} vote={vote}>
        <DownVote {...styleIcon} />
      </Button>
    </div>
  );
};

export default ButtonVote;
