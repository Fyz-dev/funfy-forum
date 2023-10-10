'use client';

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
} from '@nextui-org/navbar';
import { FC, useState } from 'react';
import { Button } from '@nextui-org/button';
import { Tab, Tabs } from '@nextui-org/tabs';
import { useDisclosure } from '@nextui-org/use-disclosure';
import Authorization, { ModeAuth } from 'src/components/Authorization';

const Header: FC = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [mode, setMode] = useState<ModeAuth>('Login');

  const handlerAuth = (openMode: ModeAuth) => {
    onOpen();
    if (openMode !== mode) setMode(openMode);
  };

  return (
    <Navbar disableAnimation isBordered>
      <NavbarContent>
        <NavbarMenuToggle className="sm:hidden" />
        <NavbarBrand>
          <p className="font-bold text-inherit">Funfy</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex" justify="center">
        <Tabs color="primary" variant="underlined">
          <Tab className="text-xl" title="Home" />
          <Tab className="text-xl" title="Community" />
        </Tabs>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <Button
            onClick={() => handlerAuth('Login')}
            color="primary"
            variant="flat"
          >
            Login
          </Button>
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">
          <Button
            onClick={() => handlerAuth('Sign-up')}
            color="primary"
            variant="solid"
          >
            Sign Up
          </Button>
        </NavbarItem>
        <Authorization
          isOpen={isOpen}
          mode={mode}
          onOpenChange={onOpenChange}
        ></Authorization>
      </NavbarContent>
    </Navbar>
  );
};

export default Header;
