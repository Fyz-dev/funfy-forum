'use client';

import { FC, MouseEvent, ReactNode } from 'react';
import { Ripple, useRipple } from '@nextui-org/ripple';
import Link from 'next/link';

interface RippleContainerProps {
  className?: string;
  children: ReactNode;
  href?: string;
}

const RippleContainer: FC<RippleContainerProps> = ({
  children,
  href,
  className = '',
}) => {
  const { onClick: ripple, onClear, ripples } = useRipple();

  return (
    <Link
      href={href ? href : '#'}
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
