'use server';

import { createServerClient } from 'src/utils/supabase/server';
import {
  TableCommentWithPost,
  TableCommentWithPostWithoutNull,
} from '../convertor/types';
import { ICommentWithPost } from 'src/interface';
import { TSortComments } from 'src/types';
import { toCommentWithPost } from '../convertor';

export const getCommentsByUser = async (
  id: string,
  sort: TSortComments,
): Promise<ICommentWithPost[]> => {
  const sortBy = sort === 'new' || sort === 'old' ? 'voteCount' : 'created_at';
  const ascending = sort === 'new' || sort === 'best';

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
