import { IComments } from 'src/interface';
import { ICommentService } from '../InterfaceServices';
import { comments } from './data';

export default class CommentService implements ICommentService {
  async getByPost(id: string): Promise<IComments> {
    return Promise.resolve(comments.filter(comment => comment.postID === id));
  }

  async getByUser(id: string): Promise<IComments> {
    return this.findCommentsByUser(comments, id);
  }

  private findCommentsByUser(
    commentsArray: IComments,
    userId: string,
  ): IComments {
    const result: IComments = [];

    commentsArray.forEach(comment => {
      if (comment.user.uid === userId) result.push(comment);

      if (comment.childComment.length > 0)
        result.push(...this.findCommentsByUser(comment.childComment, userId));
    });

    return result;
  }
}
