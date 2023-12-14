import { Divider } from '@nextui-org/divider';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FC } from 'react';
import { commentController } from 'src/api';
import { Commetns } from 'src/components/Comments';
import { withTieToTop } from 'src/hoc';
import { toPost } from 'src/utils/paths';

const getComments = async (idComment: string) => {
  try {
    return [await commentController.getChild(idComment)];
  } catch (error) {
    notFound();
  }
};

const PostPageComment: FC<{
  params: { id: string; idComment: string };
}> = async ({ params: { id, idComment } }) => {
  const comments = await getComments(idComment);

  return (
    <>
      <div className="inline-flex w-full items-center gap-2 overflow-hidden">
        <Link className="whitespace-nowrap text-primary" href={toPost(id)}>
          See full discussion
        </Link>
        <Divider />
      </div>
      <div className="h-full w-full">
        <Commetns comments={comments} />
      </div>
    </>
  );
};

export default withTieToTop(PostPageComment);
