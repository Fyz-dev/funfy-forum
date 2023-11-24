import { VoteEnum } from 'src/enums';
import { IVote } from 'src/interface';

export const votes: IVote[] = [
  {
    id: 'vote1',
    userID: 'user1',
    commentID: 'comment1',
    vote: VoteEnum.UP,
  },
  {
    id: 'vote2',
    userID: 'user2',
    commentID: 'comment1',
    vote: VoteEnum.DOWN,
  },
  {
    id: 'vote4',
    userID: 'user4',
    commentID: 'comment1',
    vote: VoteEnum.UP,
  },
  {
    id: 'vote3',
    userID: 'user3',
    commentID: 'comment1',
    vote: VoteEnum.UP,
  },
  {
    id: 'vote5',
    userID: 'user5',
    commentID: 'comment3',
    vote: VoteEnum.DOWN,
  },
  {
    id: 'vote6',
    userID: 'user6',
    commentID: 'comment5',
    vote: VoteEnum.UP,
  },
  {
    id: 'vote7',
    userID: 'user7',
    commentID: 'comment5',
    vote: VoteEnum.UP,
  },
  {
    id: 'vote8',
    userID: 'user8',
    commentID: 'comment6',
    vote: VoteEnum.DOWN,
  },
  {
    id: 'vote9',
    userID: 'user9',
    commentID: 'comment6',
    vote: VoteEnum.UP,
  },
  {
    id: 'vote10',
    userID: 'user1',
    commentID: 'comment9',
    vote: VoteEnum.UP,
  },
  {
    id: 'vote11',
    userID: 'user2',
    commentID: 'comment9',
    vote: VoteEnum.UP,
  },
  {
    id: 'vote12',
    userID: 'user10',
    commentID: 'comment10',
    vote: VoteEnum.DOWN,
  },
  {
    id: 'vote12',
    userID: 'user1',
    commentID: 'comment10',
    vote: VoteEnum.DOWN,
  },
  {
    id: 'vote13',
    userID: 'user1',
    commentID: 'comment10',
    vote: VoteEnum.UP,
  },
  {
    id: 'vote14',
    userID: 'user1',
    commentID: 'comment10',
    vote: VoteEnum.UP,
  },
  {
    id: 'vote14',
    userID: 'user1',
    commentID: 'comment10',
    vote: VoteEnum.UP,
  },
];
