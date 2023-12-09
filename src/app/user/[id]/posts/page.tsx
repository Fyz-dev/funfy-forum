import { FC } from 'react';
import postController from 'src/api/controller/PostController';
import { Post } from 'src/components/Post';
import { SearchParams } from 'src/types';
import { getSortParam } from 'src/utils';

const UserPage: FC<{
  params: { id: string };
  searchParams: SearchParams;
}> = async ({ params, searchParams }) => {
  console.log(getSortParam(searchParams));
  const posts = await postController.getByUser(
    params.id,
    getSortParam(searchParams),
  );

  return (
    <main className="mx-3 mb-5 flex flex-col items-start gap-5 sm:m-0">
      {posts &&
        posts.map(item => {
          return <Post key={item.id} post={item} />;
        })}
    </main>
  );
};

export default UserPage;
