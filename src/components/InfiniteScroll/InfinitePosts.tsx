'use client';

import { FC } from 'react';
import { TSortPost } from 'src/types';
import { IPost } from 'src/interface';
import Posts from '../Posts';
import InfiniteScroll from './components/InfiniteScroll';
import useSWRInfinite from 'swr/infinite';

interface Props {
  sort: TSortPost;
  sizePage: number;
  startPage: number;
  fc: (sort: TSortPost, page: number, sizePage: number) => Promise<IPost[]>;
}

const InfinitePosts: FC<Props> = props => {
  const { sort, sizePage, startPage, fc } = props;

  const swr = useSWRInfinite(
    (pageIndex, previousPageData) => {
      if (previousPageData && !previousPageData.length) return null;

      return ['posts', pageIndex + startPage, fc];
    },
    async ([_, pageIndex, _fc]) => {
      return fc(sort, pageIndex, sizePage);
    },
    {
      revalidateOnFocus: false,
    },
  );

  return (
    <InfiniteScroll<IPost> sizePage={sizePage} swr={swr}>
      {items => <Posts posts={items} />}
    </InfiniteScroll>
  );
};

export default InfinitePosts;
