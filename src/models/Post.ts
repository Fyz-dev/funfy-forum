import { Timestamp } from 'firebase/firestore';

export interface IPost {
  userName: string;
  topic: string;
  topicPhotoURL: string;
  title: string;
  content: string;
  vote: number;
  createdAt: Timestamp;
}
