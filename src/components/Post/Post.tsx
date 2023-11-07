import { FC } from 'react';
import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/card';
import { Badge } from '@nextui-org/badge';
import { Button } from '@nextui-org/button';
import { Avatar } from '@nextui-org/avatar';
import { Message, Share } from 'src/assets/icons';
import InfoTime from '../ui/InfoTime';
import { RippleContainer } from '../ui/RippleContainer';

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
  const styleIcon = { style: { height: '1.1rem', width: '1.1rem' } };

  return (
    <RippleContainer className="max-h-72 w-full">
      <Card className="max-h-72">
        <CardHeader className="mr-auto flex w-auto flex-col justify-start gap-3 pb-1">
          <div className="mr-auto flex h-5 items-center justify-start gap-3">
            <Avatar radius="full" size="sm" src={topicPhotoURL} />
            <div className="inline-flex items-center">
              <h2 className="flex text-small font-semibold leading-none text-default-600">
                {topic}
              </h2>
              <InfoTime content={`Posted by ${user} 15 hr. ago`} />
            </div>
          </div>
          <h1 className="mr-auto text-left">{title}</h1>
        </CardHeader>
        <CardBody className="overflow-hidden py-0 text-small text-default-400">
          <p>{content}</p>
          <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-b from-transparent to-content1 to-90% " />
        </CardBody>
        <CardFooter className="h-12 gap-1">
          <Button
            isIconOnly
            radius="full"
            className="bg-transparent p-0 text-default-400"
          >
            <Badge content="1" className="border-none text-xs" size="sm">
              <Message {...styleIcon} />
            </Badge>
          </Button>
          <Button
            isIconOnly
            radius="full"
            className="bg-transparent p-0 text-default-400"
          >
            <Share {...styleIcon} />
          </Button>
        </CardFooter>
      </Card>
    </RippleContainer>
  );
};

export default Post;
