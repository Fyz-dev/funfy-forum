import { Avatar } from '@nextui-org/avatar';
import { FC, ReactElement } from 'react';
import { Button } from '@nextui-org/button';
import InfoTime from '../ui/InfoTime';
import { Message } from 'src/assets/icons';
import ButtonVote, { ButtonVoteProps } from './components/ButtonVote';

type CommentProps = {
  userName: string;
  avatarUser: string;
  content: string;
  children?: ReactElement | ReactElement[];
} & ButtonVoteProps;

const Comment: FC<CommentProps> = ({
  userName,
  avatarUser,
  voteCount,
  content,
  children,
}) => {
  return (
    <div className="flex flex-col ">
      <div className="inline-flex items-center gap-1">
        <div className="inline-flex items-center gap-3">
          <Avatar radius="full" size="md" src={avatarUser} />
          <div className="inline-flex flex-col items-start gap-0 text-small sm:flex-row sm:items-center sm:gap-1 sm:text-medium">
            <span>{userName}</span>
            <InfoTime dotClassName="hidden sm:block" content="10 hr. ago" />
          </div>
        </div>
        <ButtonVote className="ml-auto hidden md:flex" voteCount={voteCount} />
      </div>
      <div className="ml-5 flex flex-col gap-1 border-l-[1px] border-default-400">
        <div className="ml-8 text-small">
          <p>{content}</p>
        </div>
        <div className="ml-8 inline-flex">
          <ButtonVote className="flex md:hidden" voteCount={voteCount} />
          <Button
            radius="full"
            className="bg-transparent p-0 text-default-600 hover:bg-default-100"
          >
            <Message />
            <span>Reply</span>
          </Button>
        </div>

        {/* Здесь будут дочерние коментарии */}
        {children ? <div className="ml-2"> {children}</div> : null}
      </div>
      {/* Вариант через i */}
      {/* <div className="inline-flex">
        <div className="flex h-full min-w-[40px] max-w-[40px] items-center justify-center">
          <i className="h-full self-center border-r-2 border-default-400"></i>
        </div>
        <div className="ml-5">
          <p>
          
          </p>
        </div>
      </div> */}
    </div>
  );
};

export default Comment;
