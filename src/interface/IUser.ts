// export enum Role{

// }

export interface IUserDetails {
  description?: string;
  socialNetwork: string[];
}

export interface IUser {
  uid: string;
  name: string;
  userDetails: IUserDetails;
  email: string;
  photoURL?: string;
  isBlocked: boolean;
}
