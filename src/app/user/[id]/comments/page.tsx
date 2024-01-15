import { FC } from 'react';
import CommentCard from 'src/components/Comment/CommentCard';
import { TSearchParams } from 'src/types';
import { getSortCommentsUserParam } from 'src/utils';
import { Empty } from 'src/components/ui/Empty';
import { withTieToTop } from 'src/hoc';
import { getCommentsByUser, getUserById } from 'src/api/supabase';
import { InfiniteCommentLinier } from 'src/components/InfiniteScroll';

const UserPage: FC<{
  params: { id: string };
  searchParams: TSearchParams;
}> = async ({ params, searchParams }) => {
  const user = await getUserById(params.id);
  const comments = await getCommentsByUser(
    params.id,
    getSortCommentsUserParam(searchParams),
    1,
    5,
  );

  return (
    <main className="mx-3 mb-5 flex flex-col items-start gap-5 sm:m-0">
      {comments.length !== 0 ? (
        <>
          {comments.map(comment => {
            return (
              <CommentCard key={comment.id} user={user} comment={comment} />
            );
          })}
          <InfiniteCommentLinier
            startPage={2}
            sizePage={5}
            sort={getSortCommentsUserParam(searchParams)}
            fc={async (sort, page, sizePage) => {
              'use server';
              return getCommentsByUser(params.id, sort, page, sizePage);
            }}
          />
        </>
      ) : (
        <Empty />
      )}
    </main>
  );
};

export default withTieToTop(UserPage);
