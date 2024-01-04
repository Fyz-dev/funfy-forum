import { FC } from 'react';
import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/card';
import { Badge } from '@nextui-org/badge';
import { Button } from '@nextui-org/button';
import { Avatar } from '@nextui-org/avatar';
import { Hashtag, Message } from 'src/assets/icons';
import InfoTime from '../ui/InfoTime';
import { RippleContainer } from '../ui/RippleContainer';
import { IPost } from 'src/interface';
import Link from 'next/link';
import { toPost, toPostSectionComment, toTopic, toUser } from 'src/utils/paths';
import { timePassed } from 'src/utils';
import { ShareButton } from '../ui/ShareButton';
import { MDXRender } from '../MDXRender';

const Post: FC<{ post: IPost }> = ({ post }) => {
  const styleIcon = { style: { height: '1.1rem', width: '1.1rem' } };

  return (
    <Card isPressable as={Card} className="w-full hover:scale-[1.02]">
      <RippleContainer href={toPost(post.id)}>
        <CardHeader className="mr-auto flex w-auto flex-none flex-col justify-start gap-1 pb-1">
          <div className="mr-auto flex h-auto items-center justify-start gap-3 max-sm:items-start">
            <Avatar
              as={Link}
              href={toTopic(post.topic.id)}
              radius="full"
              size="sm"
              src={post.topic.photoURL || undefined}
              fallback={<Hashtag className="h-5 w-5 text-primary" />}
              className="relative min-w-[2rem]"
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
                      className="link relative text-default-400"
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
        <CardBody
          // as={Link}
          // href={toPost(post.id)}
          className="relative max-h-72 w-full overflow-hidden py-0"
        >
          <Link href={toPost(post.id)} className="absolute inset-0" />
          <MDXRender className="text-default-500">{post.content}</MDXRender>
          <div className="absolute inset-x-0 top-0 mt-[15.5rem] h-10 min-h-[2.5rem] bg-gradient-to-b from-transparent to-content1 to-90% " />
        </CardBody>
        <CardFooter className="h-12 gap-1">
          <Button
            as={Link}
            href={toPostSectionComment(post.id)}
            isIconOnly
            radius="full"
            variant="light"
            className="overflow-visible bg-transparent p-0 text-default-400"
          >
            <Badge
              content={post.commentCount}
              className="border-none text-xs"
              size="sm"
            >
              <Message {...styleIcon} />
            </Badge>
          </Button>
          <ShareButton url={toPost(post.id)} />
        </CardFooter>
      </RippleContainer>
    </Card>
  );
};

export default Post;
