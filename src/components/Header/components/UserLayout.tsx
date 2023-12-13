'use client';

import { NavbarItem } from '@nextui-org/navbar';
import { Button } from '@nextui-org/button';
import { FC, useState } from 'react';
import { useDisclosure } from '@nextui-org/use-disclosure';
import Authorization, {
  EnumModeAuth,
  ModeAuth,
} from 'src/components/Authorization';
import { useAuth } from 'src/context/Auth';
import HeaderUser from './HeaderUser';

const UserLayout: FC = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [mode, setMode] = useState<ModeAuth>(EnumModeAuth.LOGIN);
  const { user } = useAuth();

  const handlerAuth = (openMode: ModeAuth) => {
    if (openMode !== mode) setMode(openMode);
    onOpen();
  };

  return (
    <>
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
    </>
  );
};

export default UserLayout;
