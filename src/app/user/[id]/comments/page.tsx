import { FC } from 'react';
import { commentController, userController } from 'src/api';
import CommentCard from 'src/components/Comment/CommentCard';
import { TSearchParams } from 'src/types';
import { getSortCommentsUserParam } from 'src/utils';
import { Empty } from 'src/components/ui/Empty';
import { withTieToTop } from 'src/hoc';

const UserPage: FC<{
  params: { id: string };
  searchParams: TSearchParams;
}> = async ({ params, searchParams }) => {
  const user = await userController.getById(params.id);
  const comments = await commentController.getByUser(
    params.id,
    getSortCommentsUserParam(searchParams),
  );

  return (
    <main className="mx-3 mb-5 flex flex-col items-start gap-5 sm:m-0">
      {comments.length !== 0 ? (
        comments.map(comment => {
          return <CommentCard key={comment.id} user={user} comment={comment} />;
        })
      ) : (
        <Empty />
      )}
    </main>
  );
};

export default withTieToTop(UserPage);
