'use client';

import { FC } from 'react';
import { Tabs, Tab } from '@nextui-org/tabs';

interface SwitchButtonProps {
  tabList?: string;
  base?: string;
}

const SwitchButton: FC<SwitchButtonProps> = ({ tabList = '', base = '' }) => {
  return (
    <Tabs
      classNames={{ tabList: `${tabList}`, base: `${base}` }}
      aria-label="filter"
    >
      <Tab key="posts" title="Posts" />
      <Tab key="comments" title="Comments" />
    </Tabs>
  );
};

export default SwitchButton;
