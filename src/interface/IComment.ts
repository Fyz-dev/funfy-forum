import { IPost, IUser } from '.';
import { IComments } from './IComments';
import { ITimestamps } from './ITimestamps';

interface IBase {
  id: string;
  user: IUser;
  content: string;
  voteCount: number;
  childComment: IComments;
  timestamp: ITimestamps;
}

export interface IComment extends IBase {
  postID?: string;
}

export interface ICommentWithPost extends IBase {
  post: IPost;
}
