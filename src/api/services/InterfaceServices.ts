import { IComments, IPost, IPosts, IUser } from 'src/interface';

export interface IPostService {
  getAll(): Promise<IPosts>;
  getById(id: string): Promise<IPost>;
  getByUser(id: string): Promise<IPosts | undefined>;
}

export interface ICommentService {
  getByPost(id: string): Promise<IComments>;
}

export interface IUserService {
  getById(id: string): Promise<IUser>;
}
