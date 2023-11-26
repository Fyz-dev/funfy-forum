import { IUser } from 'src/interface';
import { IUserService } from '../InterfaceServices';
import { users } from './data';

export default class UserService implements IUserService {
  async getById(id: string): Promise<IUser> {
    const user = users.find(user => id === user.uid);

    if (user) return Promise.resolve(user);

    throw new Error('Not find user');
  }
}
