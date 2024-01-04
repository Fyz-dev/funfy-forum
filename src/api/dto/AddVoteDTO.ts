import { VoteEnum } from 'src/enums';

export interface AddVoteDTO {
  userId: string;
  commentId: number;
  vote: VoteEnum;
}
