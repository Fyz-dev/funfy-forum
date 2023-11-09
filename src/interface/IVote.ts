export enum Vote {
  UP = 1,
  DOWN = -1,
}

export interface IVote {
  id: string;
  userID: string;
  commentID: string;
  vote: Vote;
}
