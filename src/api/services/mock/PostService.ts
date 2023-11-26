import { IPost, IPosts } from 'src/interface';
import { posts } from './data';
import { IPostService } from '../InterfaceServices';

export default class PostService implements IPostService {
  async getAll(): Promise<IPosts> {
    return posts;
  }

  getById(id: string): Promise<IPost> {
    const post = posts.find(post => id === post.id);

    if (post) return Promise.resolve(post);

    throw new Error('Not find post');
  }

  getByUser(id: string): Promise<IPosts | undefined> {
    return Promise.resolve(posts.filter(post => id === post.user.uid));
  }
}
