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
    <div
      // href={href ? href : '#'}
      // Закругление берем с Card компонента
      className={`relative w-full overflow-hidden rounded-large ${className}`}
      onClick={(e: MouseEvent<HTMLDivElement>) => {
        ripple(e);
      }}
    >
      {href && <Link href={href} className="absolute inset-0" />}
      {children}
      <Ripple onClear={onClear} ripples={ripples} />
    </div>
  );
};

export default RippleContainer;
