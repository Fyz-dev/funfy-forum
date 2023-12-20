import { IUser } from 'src/interface';
import { IUserService } from '../services/InterfaceServices';
import { UserService } from '../services/supabase';

interface IUserController extends IUserService {}

class UserController implements IUserController {
  private userService;

  constructor(userService: IUserService) {
    this.userService = userService;
  }

  async getById(id: string): Promise<IUser> {
    return this.userService.getById(id);
  }
}

const userController = new UserController(new UserService());

export default userController;
