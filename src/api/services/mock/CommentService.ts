import { ICommentWithPost, IComments } from 'src/interface';
import { ICommentService } from '../InterfaceServices';
import { comments } from './data';
import { postController } from 'src/api';

let postIdParent: string = '';

export default class CommentService implements ICommentService {
  async getByPost(id: string): Promise<IComments> {
    return Promise.resolve(comments.filter(comment => comment.postID === id));
  }

  async getByUser(id: string): Promise<ICommentWithPost[]> {
    return this.findCommentsByUser(comments, id);
  }

  private async findCommentsByUser(
    commentsArray: IComments,
    userId: string,
  ): Promise<ICommentWithPost[]> {
    const result: ICommentWithPost[] = [];

    for (const comment of commentsArray) {
      const { postID, ...rest } = comment;
      if (postID) postIdParent = postID;

      const commentWithPost: ICommentWithPost = {
        ...rest,
        post: await postController.getById(postID || postIdParent),
      };

      if (comment.user.uid === userId) result.push(commentWithPost);

      if (comment.childComment.length > 0) {
        result.push(
          ...(await this.findCommentsByUser(comment.childComment, userId)),
        );
      }
    }

    return result;
  }
}
