import { Dispatch, MutableRefObject, SetStateAction } from 'react';

export const loadMoreData = <T>(
  sourceArray: ResponsData<T>,
  searchText: string,
  searchFunction: (
    text: string,
    numberPage?: number,
    sizePage?: number,
  ) => Promise<T[]>,
  pageRef: MutableRefObject<number>,
  setData: Dispatch<SetStateAction<ResponsData<T>>>,
  sizePage: number,
) => {
  Promise.all([
    searchFunction(searchText, (pageRef.current += 1), sizePage),
    searchFunction(searchText, pageRef.current + 1, sizePage),
  ]).then(([data, moreData]) =>
    setData({
      data: sourceArray.data.concat(data),
      resLenght: data.length + moreData.length,
    }),
  );
};
