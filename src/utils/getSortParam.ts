import { SearchParams, Sort } from 'src/types';

export const getSortParam = (searchParams: SearchParams): Sort => {
  const sortParamArray = searchParams['sort'];
  const searchParam = Array.isArray(sortParamArray)
    ? sortParamArray[0]
    : sortParamArray;

  return searchParam === 'old' ? 'old' : 'new';
};
