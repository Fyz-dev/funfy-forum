'use client';

import { useState } from 'react';

export interface Props<T> {
  fc: (numberPage: number, sizePage: number) => Promise<T[]>;
  sizePage: number;
  defaultNumberPage?: number;
}

const useLoadItems = <T,>(props: Props<T>) => {
  const { fc, sizePage, defaultNumberPage } = props;

  const [pageNumber, setPageNumber] = useState<number>(defaultNumberPage || 1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const [items, setItems] = useState<T[]>([]);

  const onLoadMore = () => {
    setIsLoading(true);

    fc(pageNumber, sizePage).then(data => {
      setItems(items.concat(data));
      setHasNextPage(data.length !== 0);
      setIsLoading(false);
    });

    setPageNumber(pageNumber + 1);
  };

  const reset = () => {
    setIsLoading(false);
    items.length = 0;
    setHasNextPage(true);
    setPageNumber(defaultNumberPage || 1);
  };

  return { items, isLoading, hasNextPage, reset, onLoadMore };
};

export default useLoadItems;
