import {
  IComment,
  ICommentWithPost,
  IComments,
  IPost,
  IPosts,
  ITopic,
  IUser,
} from 'src/interface';
import { AddVoteDTO, PostCreateDTO, TopicCreateDTO } from '../dto';
import { TSortComments, TSortPost } from 'src/types';

export interface IPostService {
  create(post: PostCreateDTO): Promise<void>;
  getPosts(sort: TSortPost): Promise<IPosts>;
  getById(id: string): Promise<IPost>;
  getByUser(id: string, sort: TSortPost): Promise<IPosts | undefined>;
  getByTopic(id: string, sort: TSortPost): Promise<IPosts | undefined>;
}

export interface ICommentService {
  getByPost(id: string, sort: TSortComments): Promise<IComments>;
  getByUser(id: string, sort: TSortComments): Promise<ICommentWithPost[]>;
  getChild(idComment: number): Promise<IComment>;
  addVote(data: AddVoteDTO): Promise<void>;
}

export interface IUserService {
  getById(id: string): Promise<IUser>;
}

export interface ITopicService {
  create(topic: TopicCreateDTO): Promise<void>;
  getById(id: string): Promise<ITopic>;
  getByTitle(name: string): Promise<ITopic[]>;
}
