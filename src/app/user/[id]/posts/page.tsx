import { FC } from 'react';
import postController from 'src/api/controller/PostController';
import Posts from 'src/components/Posts';
import { TSearchParams } from 'src/types';
import { getSortPostParam } from 'src/utils';

const UserPage: FC<{
  params: { id: string };
  searchParams: TSearchParams;
}> = async ({ params, searchParams }) => {
  const posts = await postController.getByUser(
    params.id,
    getSortPostParam(searchParams),
  );

  return (
    <main className="mx-3 mb-5 flex flex-col items-start gap-5 sm:m-0">
      {posts && <Posts posts={posts} />}
    </main>
  );
};

export default UserPage;
