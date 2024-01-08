import { ITimestamps } from '.';

export interface ITopic {
  id: string;
  userID: string;
  photoURL?: string;
  name: string;
  description: string | undefined;
  timestamp: ITimestamps;
}
