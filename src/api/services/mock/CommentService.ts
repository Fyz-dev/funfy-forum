import { IComment, ICommentWithPost, IComments } from 'src/interface';
import { ICommentService } from '../InterfaceServices';
import { comments } from './data';
import { postController } from 'src/api';
import { TSortComments } from 'src/types';
import { comment } from 'postcss';

let postIdParent: string = '';

// ------------ Utils ------------ //

type FCSort = (a: IComment, b: IComment) => number;

const compareByDate = (a: IComment, b: IComment): number => {
  return a.timestamp.createdAt.getTime() - b.timestamp.createdAt.getTime();
};

const compareByReverseDate = (a: IComment, b: IComment): number => {
  return b.timestamp.createdAt.getTime() - a.timestamp.createdAt.getTime();
};

const compareByVoteCount = (a: IComment, b: IComment): number => {
  return b.voteCount - a.voteCount;
};

const compareByReverseVoteCount = (a: IComment, b: IComment): number => {
  return a.voteCount - b.voteCount;
};

const sortComments = (comment: IComment, sort: FCSort) => {
  comment.childComment.sort(sort);
  comment.childComment.forEach(item => sortComments(item, sort));
};

const getSort = (sort: TSortComments): FCSort => {
  return sort === 'new'
    ? compareByDate
    : sort === 'old'
    ? compareByReverseDate
    : sort === 'best'
    ? compareByVoteCount
    : compareByReverseVoteCount;
};

// ------------------------------- //

export default class CommentService implements ICommentService {
  async getByPost(id: string, sort: TSortComments): Promise<IComments> {
    const commentsFilter = comments.filter(comment => comment.postID === id);
    const sortFC: FCSort = getSort(sort);

    commentsFilter.sort(sortFC);
    commentsFilter.forEach(comment => sortComments(comment, sortFC));

    return Promise.resolve(commentsFilter);
  }

  async getByUser(
    id: string,
    sort: TSortComments,
  ): Promise<ICommentWithPost[]> {
    const posts = await this.findCommentsByUser(comments, id);

    posts.sort(getSort(sort));

    return posts;
  }

  async getChild(idComment: string): Promise<IComment> {
    const comment = this.findCommentById(idComment, comments);

    if (comment) return comment;

    throw new Error('Not find comment.');
  }

  private findCommentById(
    commentId: string,
    commentsArray: IComments,
  ): IComment | undefined {
    for (const comment of commentsArray) {
      if (comment.id === commentId) return comment;

      if (comment.childComment && comment.childComment.length > 0) {
        const nestedComment = this.findCommentById(
          commentId,
          comment.childComment,
        );
        if (nestedComment) return nestedComment;
      }
    }

    return undefined;
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
