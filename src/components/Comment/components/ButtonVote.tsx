import { FC } from 'react';
import { UpVote, DownVote } from 'src/assets/icons';
import { Button } from '@nextui-org/button';

export type ButtonVoteProps = {
  voteCount: number;
  className?: string;
};

const ButtonVote: FC<ButtonVoteProps> = ({ voteCount, className = '' }) => {
  const styleIcon = { style: { height: '1.5rem', width: '1.5rem' } };

  return (
    <div className={`items-center ${className}`}>
      <Button
        radius="full"
        className="bg-transparent p-0 text-default-600"
        // h-unit-8 min-h-unit-8 w-unit-8 min-w-unit-8
        isIconOnly
      >
        <UpVote {...styleIcon} />
      </Button>
      <span className="text-small">{voteCount}</span>
      <Button
        radius="full"
        className="bg-transparent p-0 text-default-600"
        isIconOnly
      >
        <DownVote {...styleIcon} />
      </Button>
    </div>
  );
};

export default ButtonVote;
