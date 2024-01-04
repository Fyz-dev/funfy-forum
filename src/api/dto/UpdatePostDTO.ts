import { IPost } from 'src/interface';

export type UpdatePostDTO = Pick<IPost, 'id' | 'title' | 'content'>;
