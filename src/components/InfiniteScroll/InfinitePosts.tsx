'use client';

import { FC, useEffect } from 'react';
import { TSortPost } from 'src/types';
import { IPost } from 'src/interface';
import { useLoadItems } from 'src/hooks';
import Posts from '../Posts';
import InfiniteScroll from './components/InfiniteScroll';

interface Props {
  sort: TSortPost;
  sizePage: number;
  startPage: number;
  fc: (sort: TSortPost, page: number, sizePage: number) => Promise<IPost[]>;
}

const InfinitePosts: FC<Props> = props => {
  const { fc, sort, sizePage, startPage } = props;

  const loadItems = useLoadItems<IPost>({
    fc: (numberPage, sizePage) => fc(sort, numberPage, sizePage),
    sizePage: sizePage,
    defaultNumberPage: startPage,
  });

  useEffect(() => {
    loadItems.reset();

    //eslint-disable-next-line
  }, [sort]);

  return (
    <InfiniteScroll<IPost> {...loadItems}>
      {items => <Posts posts={items} />}
    </InfiniteScroll>
  );
};

export default InfinitePosts;
