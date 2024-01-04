import { IUser } from '.';
import { ITimestamps } from './ITimestamps';
import { ITopic } from './ITopic';

export interface IPost {
  id: string;
  user: IUser;
  topic: ITopic;
  title: string;
  imageURL?: string;
  content?: string;
  isNSFW: boolean;
  commentCount: number;
  timestamp: ITimestamps;
}
