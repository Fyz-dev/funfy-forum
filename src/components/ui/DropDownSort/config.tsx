import {
  SortNew,
  SortOld,
  SortBest,
  SortControversial,
} from 'src/assets/icons';

export const PostSortConfig = {
  defaultKey: 'new',
  filterList: [
    {
      key: 'new',
      value: 'New',
      icon: <SortNew />,
    },
    {
      key: 'old',
      value: 'Old',
      icon: <SortOld />,
    },
  ],
};

export const CommentsUserSortConfig = {
  defaultKey: 'new',
  filterList: [
    ...PostSortConfig.filterList,
    {
      key: 'best',
      value: 'Best',
      icon: <SortBest />,
    },
  ],
};

export const CommentsSortConfig = {
  defaultKey: 'new',
  filterList: [
    ...CommentsUserSortConfig.filterList,
    {
      key: 'controversial',
      value: 'Сontroversial',
      icon: <SortControversial />,
    },
  ],
};
