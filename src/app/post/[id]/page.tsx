import { FC } from 'react';
import { notFound } from 'next/navigation';
import { TSearchParams } from 'src/types';
import { getSortCommentsParam } from 'src/utils';
import { withTieToTop } from 'src/hoc';
import CommentSection from './(components)/CommentSection';
import { getCommentsByPost, getPostById } from 'src/api/supabase';
import { CommentsTreeContextProvider } from 'src/context/CommentsTreeContext';

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
      <CommentSection post={post} />
    </CommentsTreeContextProvider>
  );
};

export default withTieToTop(PostPage);

export const dynamic = 'force-dynamic';
