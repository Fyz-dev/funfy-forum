// 'use client';

// import { useState } from 'react';

// interface Props<T> {
//   fc: (numberPage: number, sizePage: number) => Promise<T[]>;
//   sizePage: number;
//   defaultNumberPage?: number;
// }

// const useLoadItems = <T,>(props: Props<T>) => {
//   const { fc, sizePage, defaultNumberPage } = props;

//   const [pageNumber, setPageNumber] = useState<number>(defaultNumberPage || 1);
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [hasNextPage, setHasNextPage] = useState<boolean>(true);
//   const [items, setItems] = useState<T[]>([]);

//   const onLoadMore = () => {
//     setIsLoading(true);

//     fc(pageNumber, sizePage).then(data => {
//       setItems(items.concat(data));
//       setHasNextPage(data.length !== 0);
//       setIsLoading(false);
//     });

//     setPageNumber(pageNumber + 1);
//   };

//   return { items, isLoading, hasNextPage, onLoadMore };
// };

// export default useLoadItems;
