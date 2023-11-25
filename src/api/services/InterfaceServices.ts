import { IPost, IPosts } from 'src/interface';

export interface IPostService {
  getAllPosts(): Promise<IPosts>;
  getPostById(id: string): Promise<IPost>;
}
