import {
  TSearchParams,
  TSortComments,
  TSortCommentsUser,
  TSortPost,
} from 'src/types';

const sortPost: TSortPost[] = ['new', 'old'] as const;
const sortCommentsUser: TSortCommentsUser[] = [...sortPost, 'best'] as const;
const sortComments: TSortComments[] = [
  ...sortCommentsUser,
  'controversial',
] as const;

const getSortParam = (searchParams: TSearchParams): string | undefined => {
  const sortParamArray = searchParams['sort'];
  return Array.isArray(sortParamArray) ? sortParamArray[0] : sortParamArray;
};

const getType = <T extends string>(
  searchParam: string | undefined,
  validSortValues: readonly T[],
): T => {
  return validSortValues.includes(searchParam as T)
    ? (searchParam as T)
    : validSortValues[0];
};

export const getSortPostParam = (searchParams: TSearchParams): TSortPost =>
  getType(getSortParam(searchParams), sortPost);

export const getSortCommentsUserParam = (
  searchParams: TSearchParams,
): TSortCommentsUser => getType(getSortParam(searchParams), sortCommentsUser);

export const getSortCommentsParam = (
  searchParams: TSearchParams,
): TSortComments => getType(getSortParam(searchParams), sortComments);

// export const getSortPostParam = (searchParams: TSearchParams): TSortPost => {
//   const searchParam = getSortParam(searchParams) as TSortPost;
//   return sortPost.includes(searchParam) ? searchParam : 'new';
// };

// export const getSortCommentsUserParam = (
//   searchParams: TSearchParams,
// ): TSortCommentsUser => {
//   const searchParam = getSortParam(searchParams) as TSortCommentsUser;
//   return sortCommentsUser.includes(searchParam) ? searchParam : 'new';
// };

// export const getSortCommentsParam = (
//   searchParams: TSearchParams,
// ): TSortComments => {
//   const searchParam = getSortParam(searchParams) as TSortComments;
//   return sortComments.includes(searchParam) ? searchParam : 'new';
// };
