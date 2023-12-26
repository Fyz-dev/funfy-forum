'use client';

import { FC } from 'react';
import Link from 'next/link';
import { toUser } from 'src/utils/paths';
import CreateComment from './CreateComment';
import { useAuth } from 'src/context/Auth';
import { IPost } from 'src/interface';

const CommentSection: FC<{ post: IPost }> = ({ post }) => {
  const { user } = useAuth();

  return (
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
        <>
          <CreateComment post={post} />
        </>
      )}
    </div>
  );
};

export default CommentSection;
