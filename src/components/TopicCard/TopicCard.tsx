import { FC } from 'react';
import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/card';
import { Avatar } from '@nextui-org/avatar';
import { IStats, ITopic } from 'src/interface';
import Link from 'next/link';
import { formatDateShort, getClassName } from 'src/utils';
import { toTopic } from 'src/utils/paths';
import { Stats } from '../Stats';
import { Cake, Hashtag } from 'src/assets/icons';

interface ITopicCard {
  topic: ITopic;
  classNames?: {
    cardHeader?: string;
    card?: string;
  };
  stats?: Promise<IStats | undefined>;
}

const TopicCard: FC<ITopicCard> = ({ topic, classNames, stats }) => {
  const card = getClassName(classNames?.card);
  const cardHeader = getClassName(classNames?.cardHeader);

  return (
    <Card className={`w-80 self-start ${card}`}>
      <CardHeader className={`pb-2 ${cardHeader}`}>
        <Link
          href={toTopic(topic.id)}
          className="mr-auto inline-flex items-center gap-2 overflow-hidden transition-colors hover:text-primary"
        >
          <Avatar
            radius="full"
            size="md"
            src={topic.photoURL || undefined}
            className="min-w-max"
            classNames={{ img: 'max-w-[2rem]' }}
            fallback={<Hashtag className="h-5 w-5 text-primary" />}
          />
          <h1 className="overflow-hidden text-ellipsis whitespace-nowrap text-xl">
            {topic.name}
          </h1>
        </Link>
        {/* <Button radius="full" className="self-end" color="primary">
          Join
        </Button> */}
      </CardHeader>
      <CardBody className="overflow-hidden p-3 pt-0">
        <p className="pb-3 text-left">
          {topic.description ? topic.description : `Welcom to ${topic.name}!`}
        </p>
        <div className="inline-flex gap-2">
          <Cake className="h-5 w-5" />
          <span className="text-default-400">
            Created {formatDateShort(topic.timestamp.createdAt)}
          </span>
        </div>
      </CardBody>
      {/* <CardFooter className="flex flex-col items-start text-small text-default-400">
        <span className="text-foreground">367K</span>
        <span>Members</span>
      </CardFooter> */}
    </Card>
  );
};

export default TopicCard;
