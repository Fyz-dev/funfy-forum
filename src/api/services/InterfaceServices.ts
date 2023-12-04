import { IComments, IPost, IPosts, ITopic, IUser } from 'src/interface';
import { PostCreateDTO, TopicCreateDTO } from '../dto';

export interface IPostService {
  create(post: PostCreateDTO): Promise<void>;
  getAll(): Promise<IPosts>;
  getById(id: string): Promise<IPost>;
  getByUser(id: string): Promise<IPosts | undefined>;
  getByTopic(id: string): Promise<IPosts | undefined>;
}

export interface ICommentService {
  getByPost(id: string): Promise<IComments>;
}

export interface IUserService {
  getById(id: string): Promise<IUser>;
}

export interface ITopicService {
  create(topic: TopicCreateDTO): Promise<void>;
  getById(id: string): Promise<ITopic>;
  getByTitle(name: string): Promise<ITopic[]>;
}
