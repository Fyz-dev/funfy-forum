'use client';

import { FC, useEffect, useState } from 'react';
import { Cake, Comment, Newspaper } from 'src/assets/icons';
import { IStats } from 'src/interface';
import { formatDateShortToParts } from 'src/utils';
import { AnimatedNumber } from '../ui/AnimatedNumber';

const Stats: FC<{ stats?: Promise<IStats | undefined> }> = ({
  stats: promiseStats,
}) => {
  const [stats, setStats] = useState<IStats>();

  useEffect(() => {
    if (promiseStats) promiseStats.then(data => setStats(data));

    //eslint-disable-next-line
  }, []);

  if (!stats) return null;

  const formatDate = formatDateShortToParts(stats.cakeDay);

  return (
    <div className="mt-2 inline-flex gap-8 self-center">
      <div className="flex flex-col items-center">
        <Cake className="h-6 w-6" />
        <span className="text-medium">Cake day</span>
        <div className="-mt-1 inline-flex gap-1 text-small text-foreground-500">
          <span> {formatDate.month}</span>
          <div className="inline-flex">
            <AnimatedNumber animateToNumber={formatDate.day} />
            <span>,</span>
          </div>
          <AnimatedNumber animateToNumber={formatDate.year} />
        </div>
      </div>
      <div className="flex flex-col items-center">
        <Newspaper className="h-6 w-6" />
        <span className="text-medium">Posts</span>
        <span className="-mt-1 text-small text-foreground-500">
          <AnimatedNumber animateToNumber={stats.countPosts} />
        </span>
      </div>
      <div className="flex flex-col items-center">
        <Comment className="h-6 w-6" />
        <span className="text-medium">Comments</span>
        <span className="-mt-1 text-small text-foreground-500">
          <AnimatedNumber animateToNumber={stats.countComments} />
        </span>
      </div>
    </div>
  );
};

export default Stats;
