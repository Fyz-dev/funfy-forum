export interface CreateTopicDTO {
  userID: string;
  name: string;
  description?: string;
  photoURL: string | null;
}
