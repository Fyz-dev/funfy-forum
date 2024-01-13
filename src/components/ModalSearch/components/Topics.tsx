import { Avatar } from '@nextui-org/avatar';
import Link from 'next/link';
import { FC } from 'react';
import { ITopic } from 'src/interface';
import { toTopic } from 'src/utils/paths';

const Topics: FC<{ topics: ResponsData<ITopic> }> = ({ topics }) => {
  return (
    <div className="flex flex-col gap-2">
      {topics.data.map(topic => (
        <Link
          href={toTopic(topic.id)}
          className="inline-flex h-auto w-full items-center gap-2 rounded-large bg-default-100 p-3 transition-all hover:scale-[1.01] hover:bg-default-200 active:scale-[0.97]"
          key={topic.id}
        >
          <Avatar src={topic.photoURL} />
          <div>
            <h1>{topic.name}</h1>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Topics;
