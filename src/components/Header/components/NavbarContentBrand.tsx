import { NavbarBrand as NextUINavbarBrand } from '@nextui-org/navbar';
import { Avatar } from '@nextui-org/avatar';
import Link from 'next/link';
import { FC } from 'react';

const NavbarContentBrand: FC = () => {
  return (
    <NextUINavbarBrand>
      <Link
        href="/"
        className="relative inline-flex items-center gap-1 text-large font-bold text-inherit"
      >
        <Avatar
          size="md"
          src="/funfy256.png"
          className="rounded-none bg-transparent"
        />
        <span>Funfy</span>
      </Link>
    </NextUINavbarBrand>
  );
};

export default NavbarContentBrand;
