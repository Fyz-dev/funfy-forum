'use client';

import { Button } from '@nextui-org/button';
import Link from 'next/link';
import { FC, Fragment, ReactNode } from 'react';
import { Comment } from 'src/components/Comment';
import { IComment } from 'src/interface';
import { toCommentsPost } from 'src/utils/paths';

const COUNTCOMMENTPAGE = 4;

const Comments: FC<{ comments: IComment[]; countParents?: number }> = ({
  comments,
  countParents = 0,
}) => {
  const getComments = (comments: IComment[], moreButtonParent: ReactNode) => {
    let moreButton: ReactNode = moreButtonParent;

    return comments.map(comment =>
      comment.path.length - countParents <= COUNTCOMMENTPAGE ? (
        <Comment key={comment.id} comment={comment}>
          {getComments(comment.childComment ?? [], moreButton)}
        </Comment>
      ) : (
        <Fragment key={comment.id}>
          {!moreButton &&
            (moreButton = (
              <Button
                as={Link}
                key={comment.parentId}
                href={toCommentsPost(comment.postID, comment.parentId)}
                className="ml-6 p-0"
                radius="full"
                color="primary"
                variant="flat"
              >
                More...
              </Button>
            ))}
        </Fragment>
      ),
    );
  };

  return getComments(comments, null);
};

export default Comments;
