import { arrayToTree } from 'performant-array-to-tree';
import { IComment, ICommentData } from 'src/interface';

export type TreeComment = {
  children: TreeComment[];
  data: ICommentData;
};

const toCommentTree = (comment: TreeComment): IComment => {
  const { data, children } = comment;

  return {
    ...data,
    childComment: children.map(comment => toCommentTree(comment)),
  };
};

export const createTreeComment = (comments: ICommentData[]): IComment[] => {
  const treeComment: TreeComment[] = comments
    ? (arrayToTree(comments.flat(), {
        parentId: 'parentId',
      }) as TreeComment[])
    : [];

  return treeComment.map(comment => toCommentTree(comment));
};
