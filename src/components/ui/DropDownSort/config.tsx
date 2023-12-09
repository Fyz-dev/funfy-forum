import { SortNew, SortOld, SortBest } from 'src/assets/icons';

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
    {
      key: 'best',
      value: 'Best',
      icon: <SortBest />,
    },
  ],
};
