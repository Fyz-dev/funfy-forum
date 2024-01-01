import { FC } from 'react';
import postController from 'src/api/controller/PostController';
import Posts from 'src/components/Posts';
import { Empty } from 'src/components/ui/Empty';
import { withTieToTop } from 'src/hoc';

const TopicPage: FC<{ params: { id: string } }> = async ({ params }) => {
  const posts = await postController.getByTopic(params.id, 'new');

  return (
    <main className="mx-3 mb-5 flex flex-col items-start gap-5 sm:m-0">
      {posts.length !== 0 ? <Posts posts={posts} /> : <Empty />}
    </main>
  );
};

export default withTieToTop(TopicPage);
