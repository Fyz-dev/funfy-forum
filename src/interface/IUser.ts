// export enum Role{

// }

export interface IUserDetails {
  description: string;
  socialNetwork: string[];
}

export interface IUser {
  uid: string;
  name: string | null;
  userDetails: IUserDetails;
  email: string;
  photoURL: string | null;
  isBlocked: boolean;
}
