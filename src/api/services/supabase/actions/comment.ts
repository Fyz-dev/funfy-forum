'use server';

import { createServerClient } from 'src/utils/supabase/server';
import {
  TableCommentWithPost,
  TableCommentWithPostWithoutNull,
  TreeComment,
} from '../convertor/types';
import { IComment, ICommentWithPost, IComments } from 'src/interface';
import { TSortComments } from 'src/types';
import { toComment, toCommentWithPost } from '../convertor';
import { arrayToTree } from 'performant-array-to-tree';
import path from 'path';
import { AddVoteDTO } from 'src/api/dto';

const sortMap: Record<TSortComments, string> = {
  new: 'pathSortNew',
  old: 'pathSortOld',
  best: 'pathSortBest',
  controversial: 'pathSortControversial',
};

export const getCommentsByUser = async (
  id: string,
  sort: TSortComments,
): Promise<ICommentWithPost[]> => {
  const sortBy = sort === 'new' || sort === 'old' ? 'created_at' : 'voteCount';
  const ascending = sort === 'old' || sort === 'controversial';

  const { data, error } = await createServerClient()
    .from('comment_linear')
    .select(`*`)
    .eq('user_id', id)
    .order(sortBy, {
      ascending: ascending,
    })
    .returns<TableCommentWithPost[]>();

  if (error) console.log(error);

  return data
    ? data
        .filter(
          item =>
            item.id &&
            item.content &&
            item.post_id &&
            item.userVote !== null &&
            item.user_id &&
            item.voteCount !== null,
        )
        .map(item => toCommentWithPost(item as TableCommentWithPostWithoutNull))
    : [];
};

export const getCommentsByPost = async (
  id: string,
  sort: TSortComments,
): Promise<IComments> => {
  const { data, error } = await createServerClient()
    .from('comment_tree')
    .select(`*`)
    .eq('post_id', id)
    .order(sortMap[sort]);

  if (error) console.log(error);

  const comments: TreeComment[] = data
    ? (arrayToTree(data.flat(), {
        parentId: 'parent_comment_id',
      }) as TreeComment[])
    : [];

  return comments.map(comment => toComment(comment));
};

export const getChildComments = async (
  idComment: number,
): Promise<IComment> => {
  try {
    const { data, error } = await createServerClient()
      .from('comment_tree')
      .select(`*`)
      .contains('path', [idComment]);

    if (error) console.log(error);

    if (data) data[0].parent_comment_id = null;

    const comments: TreeComment[] = data
      ? (arrayToTree(data.flat(), {
          parentId: 'parent_comment_id',
        }) as TreeComment[])
      : [];

    return toComment(comments[0]);
  } catch {
    throw new Error('Not find comment.');
  }
};

export const addVoteToComment = async (data: AddVoteDTO): Promise<void> => {
  const { error } = await createServerClient().from('comment_votes').upsert({
    user_id: data.userId,
    comment_id: data.commentId,
    vote: data.vote,
  });

  if (error) console.log(error);
};
