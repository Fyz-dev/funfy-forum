import { IPost, IPosts } from 'src/interface';
import { posts } from './data';
import { IPostService } from '../InterfaceServices';
import { PostCreateDTO } from 'src/api/dto';

export default class PostService implements IPostService {
  async create(post: PostCreateDTO): Promise<void> {
    console.log(post);
  }

  async getAll(): Promise<IPosts> {
    return posts;
  }

  async getById(id: string): Promise<IPost> {
    const post = posts.find(post => id === post.id);

    if (post) return Promise.resolve(post);

    throw new Error('Not find post');
  }

  async getByUser(id: string): Promise<IPosts | undefined> {
    return Promise.resolve(posts.filter(post => id === post.user.uid));
  }

  async getByTopic(id: string): Promise<IPosts | undefined> {
    return Promise.resolve(posts.filter(post => id === post.topic.id));
  }
}
