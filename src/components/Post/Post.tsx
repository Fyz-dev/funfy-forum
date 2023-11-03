'use client';

import { FC } from 'react';
import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/card';
import { Badge } from '@nextui-org/badge';
import { Button } from '@nextui-org/button';
import { Avatar } from '@nextui-org/avatar';
import { BsDot as Dot } from 'react-icons/bs';
import { FaMessage as Message, FaShare as Share } from 'react-icons/fa6';

type PostProps = {
  topic: string;
  topicPhotoURL: string;
  user: string;
  title: string;
  content: string;
};

const Post: FC<PostProps> = ({
  topic,
  topicPhotoURL,
  user,
  title,
  content,
}) => {
  return (
    <Card className="max-h-72" isPressable>
      <CardHeader className="mr-auto flex w-auto flex-col justify-start gap-3 p-5 pb-1">
        <div className="mr-auto flex h-5 items-center justify-start gap-3">
          <Avatar radius="full" size="sm" src={topicPhotoURL} />
          <div className="inline-flex items-center">
            <h2 className="flex text-small font-semibold leading-none text-default-600">
              {topic}
            </h2>
            <div className="inline-flex items-center text-small text-default-400">
              <Dot />
              <h4>Posted by {user} 15 hr. ago</h4>
            </div>
          </div>
        </div>
        <h1 className="mr-auto text-left">{title}</h1>
      </CardHeader>
      <CardBody className="overflow-hidden py-0 pb-0 text-small text-default-400">
        <p>{content}</p>
        <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-b from-transparent to-content1 to-90%"></div>
      </CardBody>
      <CardFooter className="h-12 gap-1">
        <Button
          isIconOnly
          radius="full"
          className="bg-transparent p-0 text-default-400"
        >
          <Badge content="1" className="border-none text-xs" size="sm">
            <Message style={{ height: '1.1rem', width: '1.1rem' }} />
          </Badge>
        </Button>
        <Button
          isIconOnly
          radius="full"
          className="bg-transparent p-0 text-default-400"
        >
          <Share style={{ height: '1.1rem', width: '1.1rem' }} />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Post;
