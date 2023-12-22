import { IPost, IPosts } from 'src/interface';
import { IPostService } from '../InterfaceServices';
import { PostCreateDTO } from 'src/api/dto';
import { TSortPost } from 'src/types';
import {
  getPostById,
  getPostsByTopic,
  getPostsByUser,
  getPosts,
} from './actions';

export default class PostService implements IPostService {
  async create(post: PostCreateDTO): Promise<void> {
    console.log(post);
  }

  async getPosts(sort: TSortPost): Promise<IPosts> {
    return getPosts(sort);
  }

  async getById(id: string): Promise<IPost> {
    return getPostById(id);
  }

  async getByUser(id: string, sort: TSortPost): Promise<IPosts | undefined> {
    return getPostsByUser(id, sort);
  }

  async getByTopic(id: string, sort: TSortPost): Promise<IPosts | undefined> {
    return getPostsByTopic(id, sort);
  }
}
