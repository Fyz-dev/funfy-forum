'use client';

import { FC } from 'react';
import { TSortComments, TSortCommentsUser } from 'src/types';
import { ICommentWithPost } from 'src/interface';
import CommentCard from 'src/components/Comment/CommentCard';
import { Comments } from 'src/components/Comments';
import { createTreeComment } from 'src/utils';
import useSWRInfinite from 'swr/infinite';
import InfiniteScroll from './components/InfiniteScroll';
import { useCommentsTreeContext } from 'src/context/CommentsTreeContext';

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
  const { sort, sizePage, startPage, fc } = props;

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

  return (
    <InfiniteScroll swr={swr} sizePage={sizePage}>
      {items =>
        items.map(comment => (
          <CommentCard key={comment.id} user={comment.user} comment={comment} />
        ))
      }
    </InfiniteScroll>
  );
};

interface PropsInfiniteCommentTree {
  countParents?: number;
}

const InfiniteCommentTree: FC<PropsInfiniteCommentTree> = props => {
  const { countParents } = props;

  const data = useCommentsTreeContext();

  return (
    <InfiniteScroll {...data}>
      {items => (
        <Comments
          countParents={countParents}
          comments={createTreeComment(items)}
        />
      )}
    </InfiniteScroll>
  );
};

export { InfiniteCommentTree, InfiniteCommentLinier };
