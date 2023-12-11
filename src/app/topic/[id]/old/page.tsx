import { FC } from 'react';
import postController from 'src/api/controller/PostController';
import Posts from 'src/components/Posts';

const TopicPage: FC<{ params: { id: string } }> = async ({ params }) => {
  const posts = await postController.getByTopic(params.id, 'old');

  return (
    <main className="mx-3 mb-5 flex flex-col items-start gap-5 sm:m-0">
      {posts && <Posts posts={posts} />}
    </main>
  );
};

export default TopicPage;
