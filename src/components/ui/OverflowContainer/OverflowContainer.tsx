// 'use client';

// import { FC, ReactNode, useEffect, useRef } from 'react';
// import { useWindowResize } from 'src/hooks';

// interface OverflowContainerProps {
//   children: ReactNode;
//   className?: string;
// }

// const OverflowContainer: FC<OverflowContainerProps> = ({
//   children,
//   className = '',
// }) => {
//   const windowSize = useWindowResize();
//   const containerRef = useRef<HTMLDivElement>(null);
//   const shadowRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const containerElement = containerRef.current;
//     const shadowElement = shadowRef.current;

//     if (containerElement && shadowElement) {
//       const isOverflowing =
//         containerElement.scrollHeight > containerElement.clientHeight;
//       containerElement.style.display = isOverflowing ? 'block' : 'hidden';
//     }
//   }, [windowSize]);

//   return (
//     <div ref={containerRef} className={`${className}`}>
//       {children}
//       <div
//         ref={shadowRef}
//         className="inset-x-0 bottom-0 -mt-5 h-10 min-h-[2.5rem] bg-gradient-to-b from-transparent to-content1 to-90% "
//       />
//     </div>
//   );
// };

// export default OverflowContainer;
