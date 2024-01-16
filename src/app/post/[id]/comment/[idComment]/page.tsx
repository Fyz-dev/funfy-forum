import { Divider } from '@nextui-org/divider';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FC } from 'react';
import { getChildComments } from 'src/api/supabase';
import { Comments } from 'src/components/Comments';
import { InfiniteCommentTree } from 'src/components/InfiniteScroll';
import DropDownSort, {
  CommentsSortConfig,
} from 'src/components/ui/DropDownSort';
import { withTieToTop } from 'src/hoc';
import { TSearchParams, TSortComments } from 'src/types';
import { createTreeComment, getSortCommentsParam } from 'src/utils';
import { toPost } from 'src/utils/paths';

const getComments = async (idComment: number, sort: TSortComments) => {
  try {
    return createTreeComment(await getChildComments(idComment, sort, 1, 5));
  } catch (error) {
    notFound();
  }
};

const PostPageComment: FC<{
  params: { id: string; idComment: string };
  searchParams: TSearchParams;
}> = async ({ params: { id, idComment }, searchParams }) => {
  const comments = await getComments(
    Number(idComment),
    getSortCommentsParam(searchParams),
  );

  return (
    <>
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
        </>
      )}
      <div className="inline-flex w-full items-center gap-2 overflow-hidden">
        <Link className="whitespace-nowrap text-primary" href={toPost(id)}>
          See full discussion
        </Link>
        <Divider />
      </div>
      <div className="h-full w-full">
        <InfiniteCommentTree
          startPage={1}
          sizePage={5}
          countParents={comments[0].path.length - 1}
          sort={getSortCommentsParam(searchParams)}
          fc={async (sort, page, sizePage) => {
            'use server';
            return getChildComments(Number(idComment), sort, page, sizePage);
          }}
        />
      </div>
    </>
  );
};

export default withTieToTop(PostPageComment);
