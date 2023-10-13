export default class User {
  readonly uid: string;
  readonly displayName: string | null;
  readonly email: string | null;
  readonly photoURL: string | null;

  constructor(
    uid: string,
    displayName: string | null,
    email: string | null,
    photuUrl: string | null,
  ) {
    this.uid = uid;
    this.displayName = displayName;
    this.email = email;
    this.photoURL = photuUrl;
  }
}
