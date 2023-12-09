import { IPost, IPosts } from 'src/interface';
import { posts } from './data';
import { IPostService } from '../InterfaceServices';
import { PostCreateDTO } from 'src/api/dto';
import { TSortPost } from 'src/types';

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

  async getByUser(id: string, sort: TSortPost): Promise<IPosts | undefined> {
    const postsSort =
      sort === 'new'
        ? posts
            .filter(post => id === post.user.uid)
            .sort(
              (a, b) =>
                b.timestamp.createdAt.getTime() -
                a.timestamp.createdAt.getTime(),
            )
        : posts
            .filter(post => id === post.user.uid)
            .sort(
              (a, b) =>
                a.timestamp.createdAt.getTime() -
                b.timestamp.createdAt.getTime(),
            );

    return Promise.resolve(postsSort);
  }

  async getByTopic(id: string, sort: TSortPost): Promise<IPosts | undefined> {
    const postsSort =
      sort === 'new'
        ? posts
            .filter(post => id === post.topic.id)
            .sort(
              (a, b) =>
                b.timestamp.createdAt.getTime() -
                a.timestamp.createdAt.getTime(),
            )
        : posts
            .filter(post => id === post.topic.id)
            .sort(
              (a, b) =>
                a.timestamp.createdAt.getTime() -
                b.timestamp.createdAt.getTime(),
            );

    return Promise.resolve(postsSort);
  }
}
