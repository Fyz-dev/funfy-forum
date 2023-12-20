import { FC } from 'react';
import { Comments as CommentsIcon } from 'src/assets/icons';
import DropDownSort, {
  CommentsSortConfig,
} from 'src/components/ui/DropDownSort';
import postController from 'src/api/controller/PostController';
import { notFound } from 'next/navigation';
import Comments from 'src/components/Comments/Comments';
import commentController from 'src/api/controller/CommentController';
import { Divider } from '@nextui-org/divider';
import { TSearchParams } from 'src/types';
import { getSortCommentsParam } from 'src/utils';
import { withTieToTop } from 'src/hoc';
import CommentSection from './(components)/CommentSection';

const getPost = async (id: string) => {
  try {
    return await postController.getById(id);
  } catch (error) {
    notFound();
  }
};

const PostPage: FC<{
  params: { id: string };
  searchParams: TSearchParams;
}> = async ({ params: { id }, searchParams }) => {
  const post = await getPost(id);
  const comments = await commentController.getByPost(
    post.id,
    getSortCommentsParam(searchParams),
  );

  return (
    <>
      <CommentSection />
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
          <Comments comments={comments} />
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
