'use server';

import { createServerClient } from 'src/utils/supabase/server';
import {
  TableComment,
  TableCommentWithPost,
  TableCommentWithPostWithoutNull,
} from '../convertor/types';
import { ICommentData, ICommentWithPost } from 'src/interface';
import { TSortComments } from 'src/types';
import { toComment, toCommentWithPost } from '../convertor';
import { AddVoteDTO, UpdateCommentDTO } from 'src/api/dto';
import { CreateCommentDTO } from 'src/api/dto/CreateCommentDTO';

const sortMap: Record<TSortComments, string> = {
  new: 'pathSortNew',
  old: 'pathSortOld',
  best: 'pathSortBest',
  controversial: 'pathSortControversial',
};

export const getCommentsByUser = async (
  id: string,
  sort: TSortComments,
  numberPage: number = 1,
  sizePage: number = 5,
): Promise<ICommentWithPost[]> => {
  const count = numberPage * sizePage;
  const sortBy = sort === 'new' || sort === 'old' ? 'created_at' : 'voteCount';
  const ascending = sort === 'old' || sort === 'controversial';

  const { data, error } = await createServerClient()
    .from('comment_linear')
    .select(`*`)
    .eq('user_id', id)
    .order(sortBy, {
      ascending: ascending,
    })
    .order('id', {
      ascending: ascending,
    })
    .range(count - sizePage, count - 1)
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
  numberPage: number = 1,
  sizePage: number = 5,
): Promise<ICommentData[]> => {
  const count = numberPage * sizePage;
  const { data, error } = await createServerClient()
    .from('comment_tree')
    .select(`*`)
    .eq('post_id', id)
    .order(sortMap[sort])
    .range(count - sizePage, count - 1);

  if (error) console.log(error);

  return data ? data.map(comment => toComment(comment as TableComment)) : [];
};

export const getChildComments = async (
  idComment: number,
  sort: TSortComments,
  numberPage: number = 1,
  sizePage: number = 5,
): Promise<ICommentData[]> => {
  const count = numberPage * sizePage;
  const { data, error } = await createServerClient()
    .from('comment_tree')
    .select(`*`)
    .contains('path', [idComment])
    .order(sortMap[sort])
    .range(count - sizePage, count - 1);

  if (error) console.log(error);

  if (data && data.length !== 0 && data[0].id === idComment)
    data[0].parent_comment_id = null;

  return data ? data.map(comment => toComment(comment as TableComment)) : [];
};

export const addVoteToComment = async (data: AddVoteDTO): Promise<void> => {
  const { error } = await createServerClient().from('comment_votes').upsert({
    user_id: data.userId,
    comment_id: data.commentId,
    vote: data.vote,
  });

  if (error) console.log(error);
};

export const createComment = async (comment: CreateCommentDTO) => {
  const { error } = await createServerClient()
    .from('comments')
    .insert({
      user_id: comment.userId,
      post_id: comment.postId,
      parent_comment_id: comment.parentCommentId || null,
      content: comment.content,
    });

  if (error) console.log(error);
};

export const updateComment = async (comment: UpdateCommentDTO) => {
  const { error } = await createServerClient()
    .from('comments')
    .update({ content: comment.content })
    .eq('id', comment.id);

  if (error) console.log(error);
};
