import { IPost, IPosts } from 'src/interface';
import { IPostService } from '../services/InterfaceServices';
import PostService from '../services/mock/PostService';

interface IPostController extends IPostService {}

class PostController implements IPostController {
  private postService;

  constructor(postService: IPostService) {
    this.postService = postService;
  }

  async getAllPosts(): Promise<IPosts> {
    return this.postService.getAllPosts();
  }

  getPostById(id: string): Promise<IPost> {
    return this.postService.getPostById(id);
  }
}

const postController = new PostController(new PostService());

export default postController;
