// export enum Role{

// }

export interface IUserDetails {
  description: string | null;
  socialNetwork: string[];
}

export interface IUser {
  uid: string;
  name: string | null;
  userDetails: IUserDetails;
  email: string;
  photoURL?: string;
  isBlocked: boolean;
}
