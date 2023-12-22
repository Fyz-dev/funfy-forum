import { VoteEnum } from 'src/enums';
import { IPost, IUser } from '.';
import { IComments } from './IComments';
import { ITimestamps } from './ITimestamps';

interface IBase {
  id: number;
  user: IUser;
  content: string;
  voteCount: number;
  userVote: VoteEnum;
  childComment: IComments;
  timestamp: ITimestamps;
}

export interface IComment extends IBase {
  postID?: string;
}

export interface ICommentWithPost extends IBase {
  post: IPost;
}
