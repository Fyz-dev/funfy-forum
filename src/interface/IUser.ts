// export enum Role{

// }

export interface IUserDescription {
  description: string;
  socialNetwork: string[];
}

export interface IUser {
  uid: string;
  name: string | null;
  email: string;
  photoURL: string | null;
  isBlocked: boolean;
}
