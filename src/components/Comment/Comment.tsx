import { Avatar } from '@nextui-org/avatar';
import { FC, ReactElement } from 'react';
import { Button } from '@nextui-org/button';
import InfoTime from '../ui/InfoTime';
import { Message } from 'src/assets/icons';
import ButtonVote from './components/ButtonVote';
import { IComment } from 'src/interface';
import Link from 'next/link';
import { toUser } from 'src/utils/paths';
import { timePassed } from 'src/utils';

type CommentProps = {
  comment: IComment;
  children?: ReactElement | ReactElement[];
};

const Comment: FC<CommentProps> = ({ comment, children }) => {
  return (
    <div className="flex flex-col">
      <div className="inline-flex items-center gap-1">
        <div className="inline-flex items-center gap-3">
          <Link href={toUser(comment.user.uid)}>
            <Avatar radius="full" size="md" src={comment.user.photoURL || ''} />
          </Link>
          <div className="inline-flex flex-col items-start gap-0 text-small sm:flex-row sm:items-center sm:gap-1 sm:text-medium">
            <Link
              className="transition-colors hover:text-primary"
              href={toUser(comment.user.uid)}
            >
              {comment.user.name}
            </Link>
            <InfoTime
              dotClassName="hidden sm:block"
              content={timePassed(comment.timestamp.createdAt)}
            />
          </div>
        </div>
        <ButtonVote
          className="ml-auto hidden md:flex"
          voteCount={comment.voteCount}
        />
      </div>
      <div className="ml-5 flex flex-col gap-1 border-l-[1px] border-default-400">
        <div className="ml-8 text-small">
          <p>{comment.content}</p>
        </div>
        <div className="ml-8 inline-flex">
          <ButtonVote
            className="flex md:hidden"
            voteCount={comment.voteCount}
          />
          <Button
            radius="full"
            className="bg-transparent p-0 text-default-600 hover:bg-default-100"
          >
            <Message />
            <span>Reply</span>
          </Button>
        </div>

        {/* Здесь будут дочерние коментарии */}
        {children && <div className="ml-2">{children}</div>}
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
