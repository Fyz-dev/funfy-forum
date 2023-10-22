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
import Authorization, {
  EnumModeAuth,
  ModeAuth,
} from 'src/components/Authorization';
import { UserAuth } from 'src/context/Auth';
import HeaderUser from './HeaderUser';
import Link from 'next/link';

const Header: FC = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [mode, setMode] = useState<ModeAuth>(EnumModeAuth.LOGIN);
  const { user } = UserAuth();

  const handlerAuth = (openMode: ModeAuth) => {
    if (openMode !== mode) setMode(openMode);
    onOpen();
  };

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

      <NavbarContent className="hidden sm:flex" justify="center">
        <Tabs color="primary" variant="underlined">
          <Tab className="text-xl" title="Home" />
          <Tab className="text-xl" title="Community" />
        </Tabs>
      </NavbarContent>

      <NavbarContent justify="end">
        {user ? (
          <HeaderUser />
        ) : (
          <>
            <NavbarItem>
              <Button
                onClick={() => handlerAuth(EnumModeAuth.LOGIN)}
                color="primary"
                variant="flat"
              >
                Login
              </Button>
            </NavbarItem>
            <NavbarItem className="hidden lg:flex">
              <Button
                onClick={() => handlerAuth(EnumModeAuth.SIGNUP)}
                color="primary"
                variant="solid"
              >
                Sign Up
              </Button>
            </NavbarItem>
            <Authorization
              isOpen={isOpen}
              mode={mode}
              setMode={setMode}
              onOpenChange={onOpenChange}
            />
          </>
        )}
      </NavbarContent>
    </Navbar>
  );
};

export default Header;
