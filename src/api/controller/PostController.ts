import { IPost, IPosts } from 'src/interface';
import { IPostService } from '../services/InterfaceServices';
import { PostService } from '../services/mock';

interface IPostController extends IPostService {}

class PostController implements IPostController {
  private postService;

  constructor(postService: IPostService) {
    this.postService = postService;
  }

  async getAll(): Promise<IPosts> {
    return this.postService.getAll();
  }

  async getById(id: string): Promise<IPost> {
    return this.postService.getById(id);
  }

  async getByUser(id: string): Promise<IPosts | undefined> {
    return this.postService.getByUser(id);
  }
}

const postController = new PostController(new PostService());

export default postController;
