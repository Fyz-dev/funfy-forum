import { IComment, ICommentWithPost, IComments } from 'src/interface';
import { ICommentService } from '../InterfaceServices';
import { TSortComments } from 'src/types';
import {
  getChildComments,
  getCommentsByPost,
  getCommentsByUser,
} from './actions';

export default class CommentService implements ICommentService {
  async getByPost(id: string, sort: TSortComments): Promise<IComments> {
    return getCommentsByPost(id, sort);
  }

  async getByUser(
    id: string,
    sort: TSortComments,
  ): Promise<ICommentWithPost[]> {
    return getCommentsByUser(id, sort);
  }

  async getChild(idComment: number): Promise<IComment> {
    return getChildComments(idComment);
  }
}
