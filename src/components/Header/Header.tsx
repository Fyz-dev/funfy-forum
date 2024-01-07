'use client';

import { FC } from 'react';
import Navbar from './components/Navbar';
import { NavbarContent, NavbarMenuToggle } from '@nextui-org/navbar';
import NavbarContentBrand from './components/NavbarContentBrand';
import NavbarContentTop from './components/NavbarContentTop';

const Header: FC = () => {
  return (
    <Navbar>
      <NavbarContent justify="start">
        <NavbarMenuToggle className="sm:hidden" />
        <NavbarContentBrand />
      </NavbarContent>

      <NavbarContent justify="end" className="gap-2">
        <NavbarContentTop />
      </NavbarContent>
    </Navbar>
  );
};

export default Header;
