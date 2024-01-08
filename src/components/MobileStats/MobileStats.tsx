import { FC } from 'react';
import { Button } from '@nextui-org/button';
import { Info } from 'src/assets/icons';
import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/popover';
import { Stats } from '../Stats';
import { IStats } from 'src/interface';

const MobileStats: FC<{
  headerText: string;
  stats: Promise<IStats | undefined>;
}> = ({ headerText, stats }) => {
  return (
    <Popover className="sm:hidden">
      <PopoverTrigger className="sm:hidden">
        <Button
          isIconOnly
          variant="flat"
          radius="full"
          size="sm"
          className="mr-auto"
        >
          <Info />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <span className="text-xl">{headerText}</span>
        <Stats stats={stats} />
      </PopoverContent>
    </Popover>
  );
};

export default MobileStats;
