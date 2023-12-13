'use client';

import { usePathname } from 'next/navigation';
import { FC } from 'react';
import DropDownSort, {
  CommentsUserSortConfig,
  PostSortConfig,
} from 'src/components/ui/DropDownSort';

const SwitchSort: FC = () => {
  const path = usePathname();
  const pathSegments = path.split('/');
  const key = pathSegments[pathSegments.length - 1];

  return (
    <>
      {key === 'posts' && (
        <DropDownSort {...PostSortConfig} className="ml-auto" />
      )}
      {key === 'comments' && (
        <DropDownSort {...CommentsUserSortConfig} className="ml-auto" />
      )}
    </>
  );
};

export default SwitchSort;
