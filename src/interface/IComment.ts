import { VoteEnum } from 'src/enums';
import { IPost, IUser } from '.';
import { ITimestamps } from './ITimestamps';

interface ICommentBase {
  id: number;
  user: IUser;
  content: string;
  voteCount: number;
  userVote: VoteEnum;
  timestamp: ITimestamps;
}

interface ICommentWithPost extends ICommentBase {
  post: IPost;
  childComment: IComment[];
}

interface ICommentData extends ICommentBase {
  postID: string;
  parentId: number;
  path: Array<number>;
}

interface IComment extends ICommentData {
  childComment: IComment[];
}

export type { ICommentData, IComment, ICommentWithPost };
