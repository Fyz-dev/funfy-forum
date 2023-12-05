import { IComments } from 'src/interface';
import { ICommentService } from '../InterfaceServices';
import { comments } from './data';

export default class CommentService implements ICommentService {
  async getByPost(id: string): Promise<IComments> {
    return Promise.resolve(comments.filter(comment => comment.postID === id));
  }

  async getByUser(id: string): Promise<IComments> {
    return Promise.resolve(comments.filter(comment => comment.user.uid === id));
  }
}
