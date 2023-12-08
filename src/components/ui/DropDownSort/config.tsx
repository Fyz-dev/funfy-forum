import { SortNew, SortOld } from 'src/assets/icons';

export const DropDownConfig = {
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
