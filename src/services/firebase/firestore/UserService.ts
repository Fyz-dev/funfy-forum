import { doc, setDoc } from 'firebase/firestore';
import User from 'src/models/User';
import { db } from '../../../../firebase';

class UserService {
  async addUser(user: User): Promise<void> {
    setDoc(doc(db, 'users', user.uid), {
      displayName: user.displayName,
      email: user.email,
      phoroURL: user.photoURL,
    });
  }
}

export const userService = new UserService();
