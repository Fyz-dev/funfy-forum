import { IUser } from 'src/interface';
import { IUserService } from '../InterfaceServices';
import { getUserById } from './actions/user';

export default class UserService implements IUserService {
  async getById(id: string): Promise<IUser> {
    return await getUserById(id);
  }
}
