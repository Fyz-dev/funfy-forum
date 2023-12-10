import { FC } from 'react';
import postController from 'src/api/controller/PostController';
import { Post } from 'src/components/Post';

const TopicPage: FC<{ params: { id: string } }> = async ({ params }) => {
  const posts = await postController.getByTopic(params.id, 'new');

  return (
    <main className="mx-3 mb-5 flex flex-col items-start gap-5 sm:m-0">
      {posts &&
        posts.map(item => {
          return <Post key={item.id} post={item} />;
        })}
    </main>
  );
};

export default TopicPage;
