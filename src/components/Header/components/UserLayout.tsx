'use client';

import { NavbarItem } from '@nextui-org/navbar';
import { Button } from '@nextui-org/button';
import { FC, useState } from 'react';
import { useDisclosure } from '@nextui-org/use-disclosure';
import Authorization, {
  EnumModeAuth,
  ModeAuth,
} from 'src/components/Authorization';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from '@nextui-org/dropdown';
import { useAuth } from 'src/context/Auth';
import { User } from '@nextui-org/user';
import Link from 'next/link';
import { toCreatTopic, toProfileSetting, toUser } from 'src/utils/paths';
import { OpenDoor, Person, Plus, Settings } from 'src/assets/icons';

const disabledKeys = ['user'];

const UserLayout: FC = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [mode, setMode] = useState<ModeAuth>(EnumModeAuth.LOGIN);
  const { user, logOut } = useAuth();

  const handlerAuth = (openMode: ModeAuth) => {
    if (openMode !== mode) setMode(openMode);
    onOpen();
  };

  const UserDropdown = () => (
    <Dropdown
      radius="sm"
      classNames={{
        content: 'p-0 border-small border-divider bg-background',
      }}
    >
      <DropdownTrigger>
        <Button
          color="primary"
          variant="light"
          className="min-w-min items-center overflow-hidden truncate px-[0.15rem] text-foreground max-sm:px-0 sm:flex"
        >
          <User
            name={user?.name}
            avatarProps={{
              src: user?.photoURL ?? '',
              size: 'sm',
              className: 'min-w-[2rem]',
            }}
            className="justify-start overflow-hidden"
            classNames={{
              name: 'truncate w-full',
              wrapper: 'overflow-hidden max-sm:hidden w-full',
            }}
          />
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        disabledKeys={disabledKeys}
        aria-label="Custom item styles"
        className="p-3"
        itemClasses={{
          base: [
            'rounded-md',
            'text-default-500',
            'transition-opacity',
            'data-[hover=true]:text-foreground',
            'data-[hover=true]:bg-default-100',
            'dark:data-[hover=true]:bg-default-50',
            'data-[selectable=true]:focus:bg-default-50',
            'data-[pressed=true]:opacity-70',
            'data-[focus-visible=true]:ring-default-500',
          ],
        }}
      >
        <DropdownSection aria-label="Profile & Actions" showDivider>
          <DropdownItem
            isReadOnly
            key="user"
            textValue="user"
            className="opacity-100"
          >
            <User
              name={user?.name}
              avatarProps={{
                src: user?.photoURL ?? '',
                size: 'sm',
              }}
            />
          </DropdownItem>
          <DropdownItem
            href={toUser(user?.uid || '/')}
            as={Link}
            key="profile"
            textValue="profile"
          >
            <div className="inline-flex items-center gap-1">
              <Person />
              Profile
            </div>
          </DropdownItem>
          <DropdownItem
            href={toCreatTopic()}
            as={Link}
            key="topicCreate"
            textValue="topicCreate"
          >
            <div className="inline-flex items-center gap-1">
              <Plus />
              Create topic
            </div>
          </DropdownItem>
          <DropdownItem
            href={toProfileSetting()}
            as={Link}
            key="settings"
            textValue="settings"
          >
            <div className="inline-flex items-center gap-1">
              <Settings />
              Settings
            </div>
          </DropdownItem>
        </DropdownSection>
        <DropdownSection aria-label="Help & Feedback">
          <DropdownItem key="logout" textValue="logout" onClick={logOut}>
            <div className="inline-flex items-center gap-1 text-danger">
              <OpenDoor />
              Log Out
            </div>
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );

  return (
    <>
      {user ? (
        <UserDropdown />
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
