'use client';

import {
  Navbar,
  NavbarContent,
  NavbarMenuToggle,
  NavbarMenu,
} from '@nextui-org/navbar';
import { FC, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import NavbarContentBrand from './components/NavbarContentBrand';
import NavbarContentTop from './components/NavbarContentTop';
import NavbarMenuContent from './components/NavbarContentMenu';

const Header: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const path = usePathname();

  useEffect(() => {
    if (isMenuOpen) setIsMenuOpen(false);

    //eslint-disable-next-line
  }, [path]);

  return (
    <Navbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className="overflow-hidden"
      classNames={{ wrapper: 'w-full max-w-none' }}
    >
      <NavbarContent justify="start">
        <NavbarMenuToggle className="sm:hidden" />
        <NavbarContentBrand />
      </NavbarContent>

      <NavbarContent justify="end" className="gap-2">
        <NavbarContentTop />
      </NavbarContent>

      <NavbarMenu>
        <NavbarMenuContent setIsMenuOpen={setIsMenuOpen} />
      </NavbarMenu>
    </Navbar>
  );
};

export default Header;
