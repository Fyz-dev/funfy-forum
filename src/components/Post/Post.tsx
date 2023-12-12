import { FC } from 'react';
import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/card';
import { Badge } from '@nextui-org/badge';
import { Button } from '@nextui-org/button';
import { Avatar } from '@nextui-org/avatar';
import { Message, Share } from 'src/assets/icons';
import InfoTime from '../ui/InfoTime';
import { RippleContainer } from '../ui/RippleContainer';
import { IPost } from 'src/interface';
import Link from 'next/link';
import { toPost, toPostSectionComment, toTopic, toUser } from 'src/utils/paths';
import { timePassed } from 'src/utils';

const Post: FC<{ post: IPost }> = ({ post }) => {
  const styleIcon = { style: { height: '1.1rem', width: '1.1rem' } };

  return (
    <Card className="w-full hover:scale-[1.02]">
      <RippleContainer href={toPost(post.id)}>
        <CardHeader className="mr-auto flex w-auto flex-none flex-col justify-start gap-1 pb-1">
          <div className="mr-auto flex h-8 items-center justify-start gap-3">
            <Avatar
              as={Link}
              href={toTopic(post.topic.id)}
              radius="full"
              size="sm"
              src={post.topic.photoURL ?? ''}
              className="relative"
            />
            <div className="flex flex-col items-center justify-start gap-y-[0.15] sm:flex sm:flex-row">
              <Link
                href={toTopic(post.topic.id)}
                className="link relative mr-auto flex text-small font-semibold leading-none text-default-600"
              >
                {post.topic.name}
              </Link>
              <InfoTime
                dotClassName="sm:block hidden"
                content={
                  <span>
                    Posted by{' '}
                    <Link
                      className="link relative"
                      href={toUser(post.user.uid)}
                    >
                      {post.user.name}
                    </Link>{' '}
                    {timePassed(post.timestamp.createdAt)}
                  </span>
                }
              />
            </div>
          </div>
          <h1 className="mr-auto text-left">{post.title}</h1>
        </CardHeader>
        <CardBody className="static max-h-40 min-h-[3rem] w-full overflow-hidden py-0 text-small text-default-400">
          <p className="max-h-36">{post.content}</p>
          <div className="inset-x-0 bottom-0 -mt-5 h-10 min-h-[2.5rem] bg-gradient-to-b from-transparent to-content1 to-90% " />
        </CardBody>
        <CardFooter className="h-12 gap-1">
          <Button
            as={Link}
            href={toPostSectionComment(post.id)}
            isIconOnly
            radius="full"
            variant="light"
            className="bg-transparent p-0 text-default-400"
          >
            <Badge
              content={post.commentCount}
              className="border-none text-xs"
              size="sm"
            >
              <Message {...styleIcon} />
            </Badge>
          </Button>
          <Button
            variant="light"
            isIconOnly
            radius="full"
            className="p-0 text-default-400"
          >
            <Share {...styleIcon} />
          </Button>
        </CardFooter>
      </RippleContainer>
    </Card>
  );
};

export default Post;
