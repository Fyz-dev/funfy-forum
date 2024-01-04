import { FC } from 'react';
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import { Avatar } from '@nextui-org/avatar';
import { RippleContainer } from 'src/components/ui/RippleContainer';
import { Comment, Message } from 'src/assets/icons';
import ButtonVote from 'src/components/Comment/components/ButtonVote';
import { Button } from '@nextui-org/button';
import { Divider } from '@nextui-org/divider';
import { ICommentWithPost, IUser } from 'src/interface';
import { toCommentsPost, toPost, toTopic } from 'src/utils/paths';
import Link from 'next/link';
import { timePassed } from 'src/utils';
import { VoteContextProvider } from './context/VoteContext';
import { MDXRender } from '../MDXRender';

const CommentCard: FC<{ comment: ICommentWithPost; user: IUser }> = ({
  comment,
  user,
}) => {
  return (
    <VoteContextProvider>
      <Card isPressable as={Card} className="w-full hover:scale-[1.02]">
        <RippleContainer href={toCommentsPost(comment.post.id, comment.id)}>
          <CardHeader className="mr-auto flex w-auto flex-none flex-col justify-start gap-1 pb-1">
            <div className="mr-auto flex w-full flex-col justify-start gap-1">
              <Link
                href={toTopic(comment.post.topic.id)}
                className="link relative mr-auto inline-flex items-center gap-3 text-default-600"
              >
                <Avatar
                  radius="full"
                  size="sm"
                  className="max-h-8 min-w-[2rem] self-start"
                  src={comment.post.topic.photoURL || undefined}
                />
                <span className="flex text-small font-semibold leading-none">
                  {comment.post.topic.name}
                </span>
              </Link>
              <div className="flex w-full overflow-hidden">
                <Link
                  href={toPost(comment.post.id)}
                  className="link relative mr-auto truncate text-medium"
                >
                  {comment.post.title}
                </Link>
              </div>
            </div>
          </CardHeader>
          <Divider />
          <CardBody className="static mt-2 w-full overflow-hidden py-0 text-small">
            <div className="flex items-center gap-1 text-default-400">
              <Comment />
              <span>
                <Link href={toPost(user.uid)} className="link relative">
                  {user.name}
                </Link>{' '}
                commented {timePassed(comment.timestamp.createdAt)}
              </span>
            </div>
            <Link
              href={toCommentsPost(comment.post.id, comment.id)}
              className="relative max-h-40 w-full overflow-hidden py-0 text-small text-default-400"
            >
              <MDXRender>{comment.content}</MDXRender>
              <div className="absolute inset-x-0 top-0 mt-[7.5rem] h-10 min-h-[2.5rem] bg-gradient-to-b from-transparent to-content1 to-90% " />
            </Link>
          </CardBody>
          <CardFooter className="gap-1 pt-0">
            <div className="inline-flex">
              <ButtonVote
                userVote={comment.userVote}
                voteCount={comment.voteCount}
                commentId={comment.id}
              />
              <Button
                radius="full"
                className="bg-transparent p-0 text-default-600 hover:bg-default-100"
                as={Link}
                href={toCommentsPost(comment.post.id, comment.id)}
              >
                <Message />
                <span>Reply</span>
              </Button>
            </div>
          </CardFooter>
        </RippleContainer>
      </Card>
    </VoteContextProvider>
  );
};

export default CommentCard;
