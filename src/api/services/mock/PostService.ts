import { IPost, IPosts } from 'src/interface';
import { posts } from './data';
import { IPostService } from '../InterfaceServices';
import { PostCreateDTO } from 'src/api/dto';
import { TSortPost } from 'src/types';

// ------------ Utils ------------ //

const getSortNew = (posts: IPosts) =>
  posts.sort(
    (a, b) => b.timestamp.createdAt.getTime() - a.timestamp.createdAt.getTime(),
  );

const getSortOld = (posts: IPosts) =>
  posts.sort(
    (a, b) => a.timestamp.createdAt.getTime() - b.timestamp.createdAt.getTime(),
  );

// ------------------------------- //

export default class PostService implements IPostService {
  async create(post: PostCreateDTO): Promise<void> {
    console.log(post);
  }

  async getPosts(sort: TSortPost): Promise<IPosts> {
    return sort === 'new' ? getSortNew(posts) : getSortOld(posts);
  }

  async getById(id: string): Promise<IPost> {
    const post = posts.find(post => id === post.id);

    if (post) return Promise.resolve(post);

    throw new Error('Not find post');
  }

  async getByUser(id: string, sort: TSortPost): Promise<IPosts | undefined> {
    const postsSort =
      sort === 'new'
        ? getSortNew(posts.filter(post => id === post.user.uid))
        : getSortOld(posts.filter(post => id === post.user.uid));

    if (postsSort.length === 0) return undefined;

    return Promise.resolve(postsSort);
  }

  async getByTopic(id: string, sort: TSortPost): Promise<IPosts | undefined> {
    const postsSort =
      sort === 'new'
        ? getSortNew(posts.filter(post => id === post.topic.id))
        : getSortOld(posts.filter(post => id === post.topic.id));

    return Promise.resolve(postsSort);
  }
}
