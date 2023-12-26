import { IComment, ICommentWithPost, IComments } from 'src/interface';
import { ICommentService } from '../InterfaceServices';
import { TSortComments } from 'src/types';
import {
  addVoteToComment,
  createComment,
  getChildComments,
  getCommentsByPost,
  getCommentsByUser,
} from './actions';
import { AddVoteDTO } from 'src/api/dto';
import { CreateCommentDTO } from 'src/api/dto/CreateCommentDTO';

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

  async addVote(data: AddVoteDTO): Promise<void> {
    return addVoteToComment(data);
  }

  async create(comment: CreateCommentDTO): Promise<void> {
    createComment(comment);
  }
}
