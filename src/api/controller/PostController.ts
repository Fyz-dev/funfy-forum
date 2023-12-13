import { IPost, IPosts } from 'src/interface';
import { IPostService } from '../services/InterfaceServices';
import { PostService } from '../services/mock';
import { PostCreateDTO } from '../dto';
import { TSortPost } from 'src/types';

interface IPostController extends IPostService {}

class PostController implements IPostController {
  private postService;

  constructor(postService: IPostService) {
    this.postService = postService;
  }

  async create(post: PostCreateDTO): Promise<void> {
    this.postService.create(post);
  }

  async getPosts(sort: TSortPost): Promise<IPosts> {
    return this.postService.getPosts(sort);
  }

  async getById(id: string): Promise<IPost> {
    return this.postService.getById(id);
  }

  async getByUser(id: string, sort: TSortPost): Promise<IPosts | undefined> {
    return this.postService.getByUser(id, sort);
  }

  async getByTopic(id: string, sort: TSortPost): Promise<IPosts | undefined> {
    return this.postService.getByTopic(id, sort);
  }
}

const postController = new PostController(new PostService());

export default postController;
