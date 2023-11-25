import { IPost, IPosts } from 'src/interface';
import { posts } from './data';
import { IPostService } from '../InterfaceServices';

export default class PostService implements IPostService {
  async getAllPosts(): Promise<IPosts> {
    return posts;
  }

  getPostById(id: string): Promise<IPost> {
    const post = posts.find(post => id === post.id);

    if (post) return Promise.resolve(post);

    throw new Error('Not find post');
  }
}
