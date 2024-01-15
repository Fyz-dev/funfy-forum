'use client';

import { FC, ReactNode, useEffect } from 'react';
import { TSortComments, TSortCommentsUser } from 'src/types';
import { ICommentWithPost, ICommentData } from 'src/interface';
import { useLoadItems } from 'src/hooks';
import InfiniteScroll from './components/InfiniteScroll';
import CommentCard from 'src/components/Comment/CommentCard';
import { Comments } from 'src/components/Comments';
import { createTreeComment } from 'src/utils';

interface Props<T> {
  sort: TSortComments;
  sizePage: number;
  startPage: number;
  fc: (sort: TSortComments, page: number, sizePage: number) => Promise<T[]>;
  children: (item: T[]) => ReactNode;
}

const InfiniteComment = <T,>(props: Props<T>) => {
  const { fc, sort, sizePage, startPage, children } = props;

  const loadItems = useLoadItems<T>({
    fc: (numberPage, sizePage) => fc(sort, numberPage, sizePage),
    sizePage: sizePage,
    defaultNumberPage: startPage,
  });

  useEffect(() => {
    loadItems.reset();

    //eslint-disable-next-line
  }, [sort]);

  return <InfiniteScroll<T> {...loadItems}>{children}</InfiniteScroll>;
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
        items.map(comment => {
          return (
            <CommentCard
              key={comment.id}
              user={comment.user}
              comment={comment}
            />
          );
        })
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
}
const InfiniteCommentTree: FC<PropsInfiniteCommentTree> = props => {
  return (
    <InfiniteComment {...props}>
      {comments => <Comments comments={createTreeComment(comments)} />}
    </InfiniteComment>
  );
};

export { InfiniteCommentLinier, InfiniteCommentTree };
