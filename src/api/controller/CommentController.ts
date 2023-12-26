import { IComment, ICommentWithPost, IComments } from 'src/interface';
import { ICommentService } from '../services/InterfaceServices';
import { CommentService } from '../services/supabase';
import { TSortComments } from 'src/types';
import { AddVoteDTO } from '../dto';
import { CreateCommentDTO } from '../dto/CreateCommentDTO';

interface ICommentController extends ICommentService {}

class CommentController implements ICommentController {
  private commentService;

  constructor(commentService: ICommentService) {
    this.commentService = commentService;
  }

  async getByPost(id: string, sort: TSortComments): Promise<IComments> {
    return this.commentService.getByPost(id, sort);
  }

  async getByUser(
    id: string,
    sort: TSortComments,
  ): Promise<ICommentWithPost[]> {
    return this.commentService.getByUser(id, sort);
  }

  async getChild(idComment: number): Promise<IComment> {
    return this.commentService.getChild(idComment);
  }

  async addVote(data: AddVoteDTO): Promise<void> {
    return this.commentService.addVote(data);
  }

  async create(comment: CreateCommentDTO): Promise<void> {
    this.commentService.create(comment);
  }
}

const commentController = new CommentController(new CommentService());

export default commentController;
