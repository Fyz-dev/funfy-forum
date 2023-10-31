import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenuToggle,
} from '@nextui-org/navbar';
import { FC } from 'react';
import Link from 'next/link';
import UserLayout from './UserLayout';

const Header: FC = () => {
  return (
    <Navbar
      disableAnimation
      isBordered
      classNames={{ wrapper: 'max-w-[1920px]' }}
    >
      <NavbarContent>
        <NavbarMenuToggle className="sm:hidden" />
        <NavbarBrand>
          <Link href="/" className="font-bold text-inherit">
            Funfy
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="end">
        <UserLayout />
      </NavbarContent>
    </Navbar>
  );
};

export default Header;
