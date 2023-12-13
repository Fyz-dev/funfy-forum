import { ITimestamps } from 'src/interface';

export interface PostCreateDTO {
  userID: string;
  topicID: string;
  title: string;
  content?: string;
  isNSFW: boolean;
  timestamp: ITimestamps;
}
