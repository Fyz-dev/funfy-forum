'use client';

import { FC } from 'react';
import { Tabs, Tab } from '@nextui-org/tabs';

interface SwitchButtonProps {
  tabs: string[];
  tabList?: string;
  base?: string;
}

const SwitchButton: FC<SwitchButtonProps> = ({
  tabs,
  tabList = '',
  base = '',
}) => {
  return (
    <Tabs
      classNames={{ tabList: `${tabList}`, base: `${base}` }}
      aria-label="filter"
    >
      {tabs.map(tab => (
        <Tab key={tab} title={tab} />
      ))}
    </Tabs>
  );
};

export default SwitchButton;
