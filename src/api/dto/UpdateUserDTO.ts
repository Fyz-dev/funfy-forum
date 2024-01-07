import { IUser, IUserDetails } from 'src/interface';

export type UpdateUserDTO = Pick<IUser, 'name' | 'photoURL' | 'uid'> &
  Pick<IUserDetails, 'description'>;
