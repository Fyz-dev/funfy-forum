import { FC } from 'react';
import { notFound } from 'next/navigation';
import { TSearchParams } from 'src/types';
import { getSortCommentsParam } from 'src/utils';
import { withTieToTop } from 'src/hoc';
import { getCommentsByPost, getPostById } from 'src/api/supabase';
import { CommentsTreeContextProvider } from 'src/context/CommentsTreeContext';
import DropDownSort, {
  CommentsSortConfig,
} from 'src/components/ui/DropDownSort';
import { Divider } from '@nextui-org/react';
import { InfiniteCommentTree } from 'src/components/InfiniteScroll';
import { Comments } from 'src/assets/icons';
import CommentCreateForm from './(components)/CommentCreateForm';

const getPost = async (id: string) => {
  try {
    return await getPostById(id);
  } catch (error) {
    notFound();
  }
};

const PostPage: FC<{
  params: { id: string };
  searchParams: TSearchParams;
}> = async ({ params: { id }, searchParams }) => {
  const post = await getPost(id);
  const comments = await getCommentsByPost(
    post.id,
    getSortCommentsParam(searchParams),
    1,
    5,
  );

  return (
    <CommentsTreeContextProvider
      sort={getSortCommentsParam(searchParams)}
      startPage={1}
      sizePage={5}
      fc={async (sort, page, sizePage) => {
        'use server';
        return getCommentsByPost(post.id, sort, page, sizePage);
      }}
    >
      <CommentCreateForm post={post} />
      {comments.length !== 0 && (
        <>
          <div className="mr-auto flex items-center gap-1">
            <span className="text-small text-default-500">Sort by: </span>
            <DropDownSort
              {...CommentsSortConfig}
              classNames={{
                trigger:
                  'shadow-none transition-all w-[10rem] py-0 min-h-8 h-unit-8 rounded-full',
              }}
            />
          </div>
          <Divider />
        </>
      )}

      {/* Comments */}
      <div className="h-full w-full">
        {comments.length !== 0 ? (
          <>
            <InfiniteCommentTree />
          </>
        ) : (
          <div className="m-10 flex h-full flex-col items-center justify-center gap-3 text-default-500">
            <Comments className="h-16 w-16" />
            <div className="flex flex-col items-center gap-1">
              <span className="text-medium">Nothing Here</span>
              <span className="text-center text-medium">
                You can be the first to tell your thoughts!
              </span>
            </div>
          </div>
        )}
      </div>
    </CommentsTreeContextProvider>
  );
};

export default withTieToTop(PostPage);

export const dynamic = 'force-dynamic';
