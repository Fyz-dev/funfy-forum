import { FC } from 'react';
import Posts from 'src/components/Posts';
import { TSearchParams } from 'src/types';
import { getSortPostParam } from 'src/utils';
import { withTieToTop } from 'src/hoc';
import { Empty } from 'src/components/ui/Empty';
import { getPostsByUser } from 'src/api/supabase';
import { InfinitePosts } from 'src/components/InfiniteScroll';

const UserPage: FC<{
  params: { id: string };
  searchParams: TSearchParams;
}> = async ({ params, searchParams }) => {
  const posts = await getPostsByUser(
    params.id,
    getSortPostParam(searchParams),
    1,
    5,
  );

  return (
    <main className="mx-3 mb-5 flex flex-col items-start gap-5 sm:m-0">
      {posts.length !== 0 ? (
        <>
          <Posts posts={posts} />
          <InfinitePosts
            sort={getSortPostParam(searchParams)}
            startPage={2}
            sizePage={5}
            fc={async (sort, page, sizePage) => {
              'use server';
              return getPostsByUser(params.id, sort, page, sizePage);
            }}
          />
        </>
      ) : (
        <Empty description="I wonder what this man is hiding" />
      )}
    </main>
  );
};

export default withTieToTop(UserPage);
