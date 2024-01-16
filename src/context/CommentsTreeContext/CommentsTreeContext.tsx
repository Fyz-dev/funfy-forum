'use client';

import { FC, ReactNode, createContext, useContext } from 'react';
import { ICommentData } from 'src/interface';
import { TSortComments } from 'src/types';
import useSWRInfinite, { SWRInfiniteResponse } from 'swr/infinite';

type EditContextProviderProps = {
  sort: TSortComments;
  sizePage: number;
  startPage: number;
  fc: (
    sort: TSortComments,
    page: number,
    sizePage: number,
  ) => Promise<ICommentData[]>;
  children?: ReactNode;
};

type CommentsTreeContextProps = {
  swr: SWRInfiniteResponse<ICommentData[]>;
} & Pick<EditContextProviderProps, 'sizePage'>;

const CommentsTreeContext = createContext<CommentsTreeContextProps>(
  {} as CommentsTreeContextProps,
);

export const CommentsTreeContextProvider: FC<
  EditContextProviderProps
> = props => {
  const { sort, sizePage, startPage, fc, children } = props;

  const swr = useSWRInfinite(
    (pageIndex, previousPageData) => {
      if (previousPageData && !previousPageData.length) return null;

      return ['comments-tree', sort, pageIndex + startPage, fc];
    },
    async ([_, _sort, pageIndex, _fc]) => fc(sort, pageIndex, sizePage),
    {
      revalidateOnFocus: false,
    },
  );

  return (
    <CommentsTreeContext.Provider value={{ swr, sizePage }}>
      {children}
    </CommentsTreeContext.Provider>
  );
};

export const useCommentsTreeContext = () => useContext(CommentsTreeContext);
