import { FC } from 'react';
import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/card';
import { Button } from '@nextui-org/button';
import { Avatar } from '@nextui-org/avatar';
import { ITopic } from 'src/interface';

interface ITopicCard {
  topic: ITopic;
}

const TopicCard: FC<ITopicCard> = ({ topic }) => {
  return (
    <Card className="w-80 self-start">
      <CardHeader>
        <div className="mr-auto inline-flex items-center gap-2 overflow-hidden">
          <Avatar
            radius="full"
            size="sm"
            src={topic.photoURL || ''}
            className="min-w-max"
            classNames={{ img: 'max-w-[2rem]' }}
          />
          <h1 className="overflow-hidden text-ellipsis whitespace-nowrap">
            {topic.title}
          </h1>
        </div>
        {/* <Button radius="full" className="self-end" color="primary">
          Join
        </Button> */}
      </CardHeader>
      <CardBody className="overflow-hidden p-3 py-0 text-small text-default-400">
        <p className="text-left">{topic.description}</p>
      </CardBody>
      <CardFooter className="flex flex-col items-start text-small text-default-400">
        {/* <span className="text-foreground">367K</span>
        <span>Members</span> */}
      </CardFooter>
    </Card>
  );
};

export default TopicCard;
