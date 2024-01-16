'use client';

import { Button } from '@nextui-org/button';
import Link from 'next/link';
import { FC, Fragment, ReactNode } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Comment } from 'src/components/Comment';
import { IComment } from 'src/interface';
import { toCommentsPost } from 'src/utils/paths';

const Comments: FC<{ comments: IComment[]; countParents?: number }> = ({
  comments,
  countParents = 0,
}) => {
  const isSmallPhone = useMediaQuery({ minWidth: '370px' });
  const isMediumPhone = useMediaQuery({ minWidth: '450px' });
  const isPhone = useMediaQuery({ minWidth: '640px' });
  const isSmallTablet = useMediaQuery({ minWidth: '768px' });
  const isTablet = useMediaQuery({ minWidth: '1024px' });
  const isDesktop = useMediaQuery({ minWidth: '1536px' });

  const maxlength = (): number => {
    if (isDesktop) return 10;
    if (isTablet) return 6;
    if (isSmallTablet) return 5;
    if (isPhone) return 4;
    if (isMediumPhone) return 3;
    if (isSmallPhone) return 2;

    return 2;
  };

  const getComments = (comments: IComment[], moreButtonParent: ReactNode) => {
    let moreButton: ReactNode = moreButtonParent;
    return comments.map(comment => {
      return (
        <Fragment key={comment.id}>
          {comment.path.length - countParents <= maxlength() ? (
            <Comment comment={comment}>
              {getComments(comment.childComment ?? [], moreButton)}
            </Comment>
          ) : (
            !moreButton &&
            comment.parentId &&
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
            ))
          )}
        </Fragment>
      );
    });
  };

  return getComments(comments, null);
};

export default Comments;
