import { VoteEnum } from 'src/enums';

export interface IVote {
  id: string;
  userID: string;
  commentID: string;
  vote: VoteEnum;
}
