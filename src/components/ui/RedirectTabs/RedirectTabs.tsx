'use client';

import { FC, ReactNode } from 'react';
import { Tabs, Tab } from '@nextui-org/tabs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type TabsConfig = {
  name: string;
  href: string;
  icon?: ReactNode;
};

interface SwitchButtonProps {
  tabs: TabsConfig[];
  baseUrl: string;
  tabList?: string;
  base?: string;
}

const RedirectTabs: FC<SwitchButtonProps> = ({
  baseUrl,
  tabs,
  tabList = '',
  base = '',
}) => {
  const path = usePathname();
  const pathSegments = path.split('/');
  const key = pathSegments[pathSegments.length - 1];

  return (
    <Tabs
      selectedKey={key}
      classNames={{ tabList: `${tabList}`, base: `${base}` }}
      aria-label="filter"
    >
      {tabs.map(tab => (
        <Tab
          as={Link}
          key={tab.name.toLocaleLowerCase()}
          title={
            <div className="flex items-center space-x-2">
              {tab.icon}
              <span>{tab.name}</span>
            </div>
          }
          href={baseUrl + '/' + tab.href}
        />
      ))}
    </Tabs>
  );
};

export default RedirectTabs;
