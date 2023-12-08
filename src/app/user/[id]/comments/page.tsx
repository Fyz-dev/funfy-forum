import { FC } from 'react';
import { commentController } from 'src/api';
import CommentCard from 'src/components/Comment/CommentCard';

const UserPage: FC<{ params: { id: string } }> = async ({ params }) => {
  const comments = await commentController.getByUser(params.id);

  return (
    <main className="mx-3 mb-5 flex flex-col items-start gap-5 sm:m-0">
      {comments &&
        comments.map(item => {
          return <CommentCard key={item.id} />;
        })}
    </main>
  );
};

export default UserPage;
