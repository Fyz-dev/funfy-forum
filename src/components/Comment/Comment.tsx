import { Avatar } from '@nextui-org/avatar';
import { FC, ReactElement } from 'react';
import InfoTime from '../ui/InfoTime';
import ButtonVote from './components/ButtonVote';
import { IComment } from 'src/interface';
import Link from 'next/link';
import { toUser } from 'src/utils/paths';
import { timePassed } from 'src/utils';
import { VoteContextProvider } from './context/VoteContext';
import ReplySection from './components/ReplySection';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Button } from '@nextui-org/button';
import { Edit } from 'src/assets/icons';
import { OnlyAuthor } from '../Checker';

type CommentProps = {
  comment: IComment;
  children?: ReactElement[];
};

const Comment: FC<CommentProps> = ({ comment, children }) => {
  return (
    <VoteContextProvider>
      <div className="flex flex-col">
        <div className="inline-flex items-center gap-1">
          <div className="inline-flex items-center gap-3">
            <Link href={toUser(comment.user.uid)}>
              <Avatar radius="full" size="md" src={comment.user.photoURL} />
            </Link>
            <div className="inline-flex flex-col items-start gap-0 text-small sm:flex-row sm:items-center sm:text-medium">
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
            className="ml-auto"
            userVote={comment.userVote}
            voteCount={comment.voteCount}
            commentId={comment.id}
          />
        </div>
        <div className="ml-5 flex flex-col gap-1 border-l-[1px] border-default-400">
          <div className="ml-8 text-small">
            <MDXRemote source={comment.content} />
          </div>
          <div className="ml-8 inline-flex">
            <ReplySection
              comment={comment}
              toolsButton={
                <>
                  {/* <ButtonVote
                    className="flex !self-start md:hidden"
                    userVote={comment.userVote}
                    voteCount={comment.voteCount}
                    commentId={comment.id}
                  /> */}
                  <OnlyAuthor idAuthor={comment.user.uid}>
                    <Button
                      className="ml-auto hover:text-default-600 "
                      radius="full"
                      variant="light"
                      isIconOnly
                    >
                      <Edit />
                    </Button>
                  </OnlyAuthor>
                </>
              }
            />
          </div>

          {/* Здесь будут дочерние коментарии */}
          {children?.length !== 0 && <div className="ml-2">{children}</div>}
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
    </VoteContextProvider>
  );
};

export default Comment;
