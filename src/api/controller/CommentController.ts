import { IComments } from 'src/interface';
import { ICommentService } from '../services/InterfaceServices';
import CommentService from '../services/mock/CommentService';

interface ICommentController extends ICommentService {}

class CommentController implements ICommentController {
  private commentService;

  constructor(commentService: ICommentService) {
    this.commentService = commentService;
  }

  async getByPost(id: string): Promise<IComments> {
    return this.commentService.getByPost(id);
  }
}

const commentController = new CommentController(new CommentService());

export default commentController;
