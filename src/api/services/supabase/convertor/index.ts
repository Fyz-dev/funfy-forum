import { IUser } from 'src/interface';
import { Tables } from 'src/types';

export const toUser = (user: Tables<'users'>): IUser => {
  return {
    uid: user.id,
    name: user.name,
    email: user.email,
    photoURL: user.photo_url || undefined,
    userDetails: {
      description: user.description,
      socialNetwork: [],
    },
    isBlocked: user.is_blocked,
  };
};
