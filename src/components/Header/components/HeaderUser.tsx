'use client';

import { FC } from 'react';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from '@nextui-org/dropdown';
import { Button } from '@nextui-org/button';
import { User } from '@nextui-org/user';

import { UserAuth } from 'src/context/Auth';
import Link from 'next/link';

const disabledKeys = ['user'];

const HeaderUser: FC = () => {
  const { user, logOut } = UserAuth();

  return (
    <Dropdown
      radius="sm"
      classNames={{
        content: 'p-0 border-small border-divider bg-background',
      }}
    >
      <DropdownTrigger>
        <Button color="primary" variant="light" className="p-0 text-foreground">
          <User
            name={user?.displayName}
            avatarProps={{
              src: user?.photoURL ?? '',
              size: 'sm',
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
          <DropdownItem isReadOnly key="user" className="opacity-100">
            <User
              name={user?.displayName}
              avatarProps={{
                src: user?.photoURL ?? '',
                size: 'sm',
              }}
            />
          </DropdownItem>
          <DropdownItem key="profile">
            <Link href={`/user/${user?.uid}`}>
              <div>Profile</div>
            </Link>
          </DropdownItem>
          <DropdownItem key="settings">Settings</DropdownItem>
        </DropdownSection>
        <DropdownSection aria-label="Help & Feedback">
          <DropdownItem key="logout" onClick={logOut}>
            <span className="text-danger">Log Out</span>
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
};

export default HeaderUser;
