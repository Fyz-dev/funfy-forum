'use client';

import { ReactNode } from 'react';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import { useLoadItems } from 'src/hooks';
import { Spinner } from '@nextui-org/spinner';

type InfiniteScrollProps<T> = ReturnType<typeof useLoadItems<T>> & {
  children: (items: T[]) => ReactNode;
};

const InfiniteScroll = <T,>(props: InfiniteScrollProps<T>) => {
  const { isLoading, items, hasNextPage, children, onLoadMore } = props;

  const [sentryRef] = useInfiniteScroll({
    loading: isLoading,
    hasNextPage,
    onLoadMore,
  });

  return (
    <>
      {items && children(items)}

      {(isLoading || hasNextPage) && (
        <div className="flex w-full justify-center self-center" ref={sentryRef}>
          <Spinner color="primary" />
        </div>
      )}
    </>
  );
};

export default InfiniteScroll;
