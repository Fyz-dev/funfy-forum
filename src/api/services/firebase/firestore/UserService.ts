import {
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
  doc,
  getDoc,
  setDoc,
} from 'firebase/firestore';
import { IUser } from 'src/interface';
import { db } from '../config/firebase';

const collectionName = 'users';

const userConvertor = {
  toFirestore(user: IUser): DocumentData {
    const { uid, ...userSpread } = user;
    return userSpread;
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions,
  ): IUser {
    const data = snapshot.data(options);
    const { name, email, photoURL, isBlocked } = data;

    return {
      uid: snapshot.id,
      name,
      email,
      photoURL,
      isBlocked,
      userDetails: {
        socialNetwork: [],
        description: '',
      },
    };
  },
};

class UserService {
  async add(user: IUser): Promise<void> {
    setDoc(
      doc(db, collectionName, user.uid).withConverter(userConvertor),
      user,
    );
  }

  async getById(uid: string): Promise<IUser> {
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
