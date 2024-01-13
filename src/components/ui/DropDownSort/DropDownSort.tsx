'use client';

import { Select, SelectItem, SelectProps } from '@nextui-org/select';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { FC, ReactNode, useState } from 'react';

type DropDownConfig = {
  key: string;
  value: string;
  icon: ReactNode;
};

type DropDownFilterProps = {
  defaultKey: string;
  filterList: DropDownConfig[];
  className?: string;
} & Pick<SelectProps, 'classNames'>;

const DropDownSort: FC<DropDownFilterProps> = ({
  defaultKey,
  filterList,
  className = '',
  ...rest
}) => {
  const searchParams = useSearchParams();
  const sort = searchParams.get('sort');
  const [item, setItem] = useState<string>(
    filterList.some(tabConfig => tabConfig.key === sort) && sort !== null
      ? sort
      : defaultKey,
  );

  return (
    <Select
      size="sm"
      variant="flat"
      className={`max-w-max ${className}`}
      selectedKeys={[item]}
      aria-label="filter"
      disallowEmptySelection
      items={filterList}
      onChange={e => {
        setItem(e.target.value);
      }}
      renderValue={items => {
        return items.map(item => (
          <div key={item.key} className="flex items-center gap-2">
            {item.data?.icon}
            <span>{item.data?.value}</span>
          </div>
        ));
      }}
      classNames={{
        mainWrapper: 'max-w-[8rem]',
        trigger:
          'shadow-none transition-all w-[7rem] py-0 min-h-10 h-unit-10 rounded-full',
        value: 'pl-1',
        innerWrapper: 'w-auto min-w-none',
      }}
      {...rest}
    >
      {item => {
        return (
          <SelectItem
            // as={Link}
            // href={`?sort=${item.key}`}
            key={item.key}
            textValue="item"
            value={item.key}
          >
            <Link href={`?sort=${item.key}`} className="absolute inset-0" />
            <div className="flex items-center gap-2">
              {item.icon}
              <span>{item.value}</span>
            </div>
          </SelectItem>
        );
      }}
    </Select>
  );
};

export default DropDownSort;
