'use client';

import { FC, MouseEvent, ReactNode } from 'react';
import { Ripple, useRipple } from '@nextui-org/ripple';
import Link from 'next/link';

interface RippleContainerProps {
  className?: string;
  children: ReactNode;
  link?: string;
}

const RippleContainer: FC<RippleContainerProps> = ({
  className,
  children,
  link,
}) => {
  const { onClick: ripple, onClear, ripples } = useRipple();

  return (
    <Link
      href={link ? link : '#'}
      // Закругление берем с Card компонента
      className={`relative overflow-hidden rounded-large ${className}`}
      onClick={(e: MouseEvent<HTMLAnchorElement>) => {
        ripple(e);
      }}
    >
      {children}
      <Ripple onClear={onClear} ripples={ripples}></Ripple>
    </Link>
  );
};

export default RippleContainer;
