import { IUser } from '.';
import { IComments } from './IComments';
import { ITimestamps } from './ITimestamps';

export interface IComment {
  id: string;
  user: IUser;
  postID?: string;
  content: string;
  voteCount: int;
  childComment: IComments;
  timestamp: ITimestamps;
}
