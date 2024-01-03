import { IComment } from 'src/interface';

export type UpdateCommentDTO = Pick<IComment, 'content' | 'id'>;
