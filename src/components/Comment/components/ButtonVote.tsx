'use client';

import { FC, ReactNode, useEffect } from 'react';
import { UpVote, DownVote } from 'src/assets/icons';
import { Button as ButtonNext } from '@nextui-org/button';
import { AuthMode, VoteEnum } from 'src/enums';
import { useVote } from '../context/VoteContext';
import { useAuth } from 'src/context/Auth';
import { addVoteToComment } from 'src/api/supabase';
import toast from 'react-hot-toast';
import { useModalAuthContext } from 'src/context/ModalAuth';

const Button: FC<{
  typeVote: VoteEnum;
  vote: VoteEnum | null;
  onClick: (vote: VoteEnum) => void;
  children: ReactNode;
}> = ({ typeVote, vote, onClick, children }) => {
  const defaultStyleButton = 'bg-transparent p-0 text-default-600';
  const voteStyleButton = defaultStyleButton + ' text-primary';

  return (
    <ButtonNext
      radius="full"
      className={vote === typeVote ? voteStyleButton : defaultStyleButton}
      // h-unit-8 min-h-unit-8 w-unit-8 min-w-unit-8
      size="sm"
      isIconOnly
      onClick={() => {
        if (vote === typeVote) {
          onClick(0);
          return;
        }
        onClick(typeVote);
      }}
    >
      {children}
    </ButtonNext>
  );
};

export type ButtonVoteProps = {
  voteCount: number;
  userVote: VoteEnum;
  commentId: number;
  className?: string;
};

const ButtonVote: FC<ButtonVoteProps> = ({
  voteCount,
  userVote,
  commentId,
  className = '',
}) => {
  const { vote, setVote } = useVote();
  const { user } = useAuth();
  const { onOpen } = useModalAuthContext();

  const styleIcon = { style: { height: '1.5rem', width: '1.5rem' } };

  useEffect(() => {
    setVote(userVote);

    //eslint-disable-next-line
  }, [userVote]);

  const handlerClick = (vote: VoteEnum) => {
    if (!user) {
      toast.error('You need to log in!');
      onOpen(AuthMode.LOGIN);
      return;
    }

    setVote(vote);
    addVoteToComment({
      userId: user.uid,
      commentId,
      vote,
    });
  };

  return (
    <div className={`flex items-center ${className}`}>
      <Button typeVote={VoteEnum.UP} onClick={handlerClick} vote={vote}>
        <UpVote {...styleIcon} />
      </Button>
      <span className={`text-small ${vote !== 0 && 'text-primary'}`}>
        {voteCount - userVote + vote}
      </span>
      <Button typeVote={VoteEnum.DOWN} onClick={handlerClick} vote={vote}>
        <DownVote {...styleIcon} />
      </Button>
    </div>
  );
};

export default ButtonVote;
