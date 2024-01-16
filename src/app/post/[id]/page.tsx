import { FC } from 'react';
import { Comments as CommentsIcon } from 'src/assets/icons';
import DropDownSort, {
  CommentsSortConfig,
} from 'src/components/ui/DropDownSort';
import { notFound } from 'next/navigation';
import Comments from 'src/components/Comments/Comments';
import { Divider } from '@nextui-org/divider';
import { TSearchParams, TSortComments } from 'src/types';
import { getSortCommentsParam } from 'src/utils';
import { withTieToTop } from 'src/hoc';
import CommentSection from './(components)/CommentSection';
import { getCommentsByPost, getPostById } from 'src/api/supabase';
import { InfiniteCommentTree } from 'src/components/InfiniteScroll';

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
    <>
      <CommentSection post={post} />
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
            <InfiniteCommentTree
              sort={getSortCommentsParam(searchParams)}
              startPage={1}
              sizePage={5}
              fc={async (sort, page, sizePage) => {
                'use server';
                return getCommentsByPost(post.id, sort, page, sizePage);
              }}
            />
          </>
        ) : (
          <div className="m-10 flex h-full flex-col items-center justify-center gap-3 text-default-500">
            <CommentsIcon className="h-16 w-16" />
            <div className="flex flex-col items-center gap-1">
              <span className="text-medium">Nothing Here</span>
              <span className="text-center text-medium">
                You can be the first to tell your thoughts!
              </span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default withTieToTop(PostPage);

export const dynamic = 'force-dynamic';
