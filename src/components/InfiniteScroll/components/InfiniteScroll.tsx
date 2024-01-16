'use client';

import { ReactNode } from 'react';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import { Spinner } from '@nextui-org/spinner';
import { SWRInfiniteResponse } from 'swr/infinite';

type InfiniteScrollProps<T> = {
  swr: SWRInfiniteResponse<T[]>;
  children: (items: T[]) => ReactNode;
  sizePage: number;
};

const InfiniteScroll = <T,>(props: InfiniteScrollProps<T>) => {
  const {
    swr: { data, size, setSize, isLoading, isValidating },
    children,
    sizePage,
  } = props;

  const flattenData = data ? data.flat() : [];
  const shouldShowSpinner =
    isValidating || (data ? data[data.length - 1]?.length === sizePage : false);

  const [sentryRef] = useInfiniteScroll({
    loading: isValidating,
    hasNextPage:
      flattenData.length !== 0 &&
      (data ? data[data.length - 1]?.length === sizePage : false),
    onLoadMore: () => setSize(size + 1),
  });

  return (
    <>
      {data && children(data.flat())}
      {shouldShowSpinner && (
        <div className="flex w-full justify-center self-center" ref={sentryRef}>
          <Spinner color="primary" />
        </div>
      )}
    </>
  );
};

export default InfiniteScroll;
