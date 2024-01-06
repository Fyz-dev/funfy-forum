// 'use client';

// import { FC, useEffect } from 'react';
// import { TSortPost } from 'src/types';
// import { IPosts } from 'src/interface';
// import useInfiniteScroll from 'react-infinite-scroll-hook';
// import { useLoadItems } from 'src/hooks';
// import Posts from '../Posts';
// import { Spinner } from '@nextui-org/spinner';
// import { Post } from '../Post';
// import { usePathname } from 'next/navigation';

// interface Props {
//   sort: TSortPost;
//   sizePage: number;
//   startPage: number;
//   fc: (sort: TSortPost, page: number, sizePage: number) => Promise<IPosts>;
// }

// const InfinitePosts: FC<Props> = props => {
//   const { sort, sizePage, startPage, fc } = props;
//   const pathName = usePathname();

//   const { items, hasNextPage, isLoading, onLoadMore } = useLoadItems({
//     fc: (numberPage, sizePage) => {
//       const data = fc(sort, numberPage, sizePage);
//       console.log(data);
//       return data;
//     },
//     sizePage: sizePage,
//     defaultNumberPage: startPage,
//   });

//   const [sentryRef] = useInfiniteScroll({
//     loading: isLoading,
//     hasNextPage,
//     onLoadMore,
//   });

//   useEffect(() => {}, [pathName]);

//   return (
//     <>
//       {items &&
//         items.map(item => {
//           return <Post key={item.id} post={item} />;
//         })}

//       {(isLoading || hasNextPage) && (
//         <div className="self-center" ref={sentryRef}>
//           <Spinner color="primary" />
//         </div>
//       )}
//     </>
//   );
// };

// export default InfinitePosts;
