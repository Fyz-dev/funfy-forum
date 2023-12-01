import { Timestamp } from 'firebase/firestore';

export interface ITimestamps {
  createdAt: Timestamp;
  updatedAt: Timestamp | null;
}
