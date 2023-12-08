import { FC } from 'react';
import { commentController, userController } from 'src/api';
import CommentCard from 'src/components/Comment/CommentCard';

const UserPage: FC<{ params: { id: string } }> = async ({ params }) => {
  const comments = await commentController.getByUser(params.id);
  const user = await userController.getById(params.id);

  return (
    <main className="mx-3 mb-5 flex flex-col items-start gap-5 sm:m-0">
      {comments &&
        comments.map(comment => {
          return <CommentCard key={comment.id} user={user} comment={comment} />;
        })}
    </main>
  );
};

export default UserPage;
