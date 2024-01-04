import { ITimestamps } from 'src/interface';

export interface CreatePostDTO {
  userID: string;
  topicID: string;
  title: string;
  content?: string;
  isNSFW: boolean;
}
