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
import { Edit } from 'src/assets/icons';
import { EditContextProvider } from 'src/context/Edit';
import EditContentComment from './components/EditContentComment';
import { ToggleEdit } from '../ToggleEdit';
import { MDXRender } from '../MDXRender';

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
          <EditContextProvider>
            <div className="ml-8 text-small">
              <EditContentComment comment={comment}>
                <>
                  <MDXRender>{comment.content}</MDXRender>
                </>
              </EditContentComment>
            </div>
            <div className="ml-8 inline-flex">
              <ReplySection
                comment={comment}
                toolsButton={
                  <>
                    <ToggleEdit
                      idAuthor={comment.user.uid}
                      radius="full"
                      variant="light"
                      className="bg-transparent p-0 text-default-600 hover:bg-default-100"
                      size="sm"
                    >
                      <Edit />
                      Edit
                    </ToggleEdit>
                  </>
                }
              />
            </div>
          </EditContextProvider>

          {/* <---- There will be child comments here ----> */}
          {children?.length !== 0 && <div className="ml-2">{children}</div>}
        </div>
      </div>
    </VoteContextProvider>
  );
};

export default Comment;
