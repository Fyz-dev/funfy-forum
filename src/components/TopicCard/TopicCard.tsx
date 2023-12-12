import { FC } from 'react';
import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/card';
import { Button } from '@nextui-org/button';
import { Avatar } from '@nextui-org/avatar';
import { ITopic } from 'src/interface';
import Link from 'next/link';
import { getClassName } from 'src/utils';
import { toTopic } from 'src/utils/paths';

interface ITopicCard {
  topic: ITopic;
  classNames?: {
    cardHeader?: string;
    card?: string;
  };
}

const TopicCard: FC<ITopicCard> = ({ topic, classNames }) => {
  const card = getClassName(classNames?.card);
  const cardHeader = getClassName(classNames?.cardHeader);

  return (
    <Card className={`w-80 self-start ${card}`}>
      <CardHeader className={cardHeader}>
        <Link
          href={toTopic(topic.id)}
          className="mr-auto inline-flex items-center gap-2 overflow-hidden transition-colors hover:text-primary"
        >
          <Avatar
            radius="full"
            size="sm"
            src={topic.photoURL || ''}
            className="min-w-max"
            classNames={{ img: 'max-w-[2rem]' }}
          />
          <h1 className="overflow-hidden text-ellipsis whitespace-nowrap">
            {topic.name}
          </h1>
        </Link>
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
