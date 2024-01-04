import { FC } from 'react';
import Posts from 'src/components/Posts';
import { TSearchParams } from 'src/types';
import { getSortPostParam } from 'src/utils';
import { withTieToTop } from 'src/hoc';
import { Empty } from 'src/components/ui/Empty';
import { getPostsByUser } from 'src/api/supabase';

const UserPage: FC<{
  params: { id: string };
  searchParams: TSearchParams;
}> = async ({ params, searchParams }) => {
  const posts = await getPostsByUser(params.id, getSortPostParam(searchParams));

  return (
    <main className="mx-3 mb-5 flex flex-col items-start gap-5 sm:m-0">
      {posts ? (
        <Posts posts={posts} />
      ) : (
        <Empty description="I wonder what this man is hiding" />
      )}
    </main>
  );
};

export default withTieToTop(UserPage);
