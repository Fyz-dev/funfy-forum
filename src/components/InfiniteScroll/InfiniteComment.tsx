'use client';

import { FC, ReactNode, useEffect } from 'react';
import { TSortComments, TSortCommentsUser } from 'src/types';
import { ICommentWithPost, ICommentData } from 'src/interface';
import CommentCard from 'src/components/Comment/CommentCard';
import { Comments } from 'src/components/Comments';
import { createTreeComment } from 'src/utils';
import useSWRInfinite from 'swr/infinite';
import InfiniteScroll from './components/InfiniteScroll';

interface Props<T> {
  sort: TSortComments;
  sizePage: number;
  startPage: number;
  fc: (sort: TSortComments, page: number, sizePage: number) => Promise<T[]>;
  children: (item: T[]) => ReactNode;
}

const InfiniteComment = <T,>(props: Props<T>) => {
  const { sort, sizePage, startPage, fc, children } = props;

  const swr = useSWRInfinite(
    (pageIndex, previousPageData) => {
      if (previousPageData && !previousPageData.length) return null;
      return ['comments', sort, pageIndex + startPage, fc];
    },
    async ([_, _sort, pageIndex, _fc]) => {
      return fc(sort, pageIndex, sizePage);
    },
    {
      revalidateOnFocus: false,
    },
  );

  useEffect(() => {
    swr.mutate();

    //eslint-disable-next-line
  }, [sort]);

  return (
    <InfiniteScroll swr={swr} sizePage={sizePage}>
      {children}
    </InfiniteScroll>
  );
};

interface PropsInfiniteCommentLinier {
  sort: TSortCommentsUser;
  sizePage: number;
  startPage: number;
  fc: (
    sort: TSortComments,
    page: number,
    sizePage: number,
  ) => Promise<ICommentWithPost[]>;
}

const InfiniteCommentLinier: FC<PropsInfiniteCommentLinier> = props => {
  return (
    <InfiniteComment {...props}>
      {items =>
        items.map(comment => (
          <CommentCard key={comment.id} user={comment.user} comment={comment} />
        ))
      }
    </InfiniteComment>
  );
};

interface PropsInfiniteCommentTree {
  sort: TSortComments;
  sizePage: number;
  startPage: number;
  fc: (
    sort: TSortComments,
    page: number,
    sizePage: number,
  ) => Promise<ICommentData[]>;
  countParents?: number;
}
const InfiniteCommentTree: FC<PropsInfiniteCommentTree> = props => {
  const { countParents, ...rest } = props;

  return (
    <InfiniteComment {...rest}>
      {items => (
        <Comments
          countParents={countParents}
          comments={createTreeComment(items)}
        />
      )}
    </InfiniteComment>
  );
};

export { InfiniteCommentTree, InfiniteCommentLinier };
