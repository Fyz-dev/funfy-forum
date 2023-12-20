'use client';

import { FC } from 'react';
import Link from 'next/link';
import { toUser } from 'src/utils/paths';
import CreateComment from './CreateComment';
import { useAuth } from 'src/context/Auth';

const CommentSection: FC = () => {
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
          <CreateComment />
        </>
      ) : (
        <>
          <CreateComment />
        </>
      )}
    </div>
  );
};

export default CommentSection;
