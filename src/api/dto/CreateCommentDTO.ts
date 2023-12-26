export interface CreateCommentDTO {
  userId: string;
  postId: string;
  parentCommentId?: number;
  content: string;
}
