import {
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
  doc,
  getDoc,
  setDoc,
} from 'firebase/firestore';
import { User } from 'src/models';
import { db } from '../config/firebase';

const collectionName = 'users';

const userConvertor = {
  toFirestore(user: User): DocumentData {
    return {
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
    };
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions,
  ): User {
    const data = snapshot.data(options);
    return new User(snapshot.id, data.displayName, data.email, data.photoURL);
  },
};

class UserService {
  async add(user: User): Promise<void> {
    setDoc(
      doc(db, collectionName, user.uid).withConverter(userConvertor),
      user,
    );
  }

  async getById(uid: string): Promise<User> {
    const docSnap = await getDoc(
      doc(db, collectionName, uid).withConverter(userConvertor),
    );

    if (docSnap.exists()) {
      return docSnap.data();
    }

    throw new Error(`Not found user by ID: ${uid}`);
  }
}

export const userService = new UserService();
