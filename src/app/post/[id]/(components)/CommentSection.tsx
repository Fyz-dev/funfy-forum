'use client';

import { FC } from 'react';
import Link from 'next/link';
import { toUser } from 'src/utils/paths';
import CreateComment from './CreateComment';
import { useAuth } from 'src/context/Auth';
import { IPost } from 'src/interface';
import { useCommentsTreeContext } from 'src/context/CommentsTreeContext';
import DropDownSort, {
  CommentsSortConfig,
} from 'src/components/ui/DropDownSort';
import { Divider } from '@nextui-org/react';
import { InfiniteCommentTree } from 'src/components/InfiniteScroll';
import { Comments } from 'src/assets/icons';

const CommentSection: FC<{ post: IPost }> = ({ post }) => {
  const { user } = useAuth();
  const {
    swr: { data },
  } = useCommentsTreeContext();

  const flattedComments = data && data.flat();

  return (
    <>
      <div className="mb-4 flex w-full flex-col gap-1 overflow-hidden">
        {user ? (
          <>
            <span>
              Comment as{' '}
              <Link className="text-primary" href={toUser(user.uid)}>
                {user.name}
              </Link>
            </span>
            <CreateComment post={post} />
          </>
        ) : (
          <CreateComment post={post} />
        )}
      </div>
      {flattedComments && flattedComments.length !== 0 && (
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
        {flattedComments && flattedComments.length !== 0 ? (
          <InfiniteCommentTree />
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
    </>
  );
};

export default CommentSection;
