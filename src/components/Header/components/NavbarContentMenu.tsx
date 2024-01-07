'use client';

import { NavbarMenuItem } from '@nextui-org/navbar';
import { Button, ButtonProps } from '@nextui-org/button';
import { Dispatch, FC, SetStateAction } from 'react';
import Link, { LinkProps } from 'next/link';
import { Github, User, Plus, OpenDoor, House } from 'src/assets/icons';
import { cn } from '@nextui-org/react';
import { useAuth } from 'src/context/Auth';
import { toCreatTopic, toUser } from 'src/utils/paths';

const ItemMenu: FC<ButtonProps & Pick<LinkProps, 'href'>> = props => {
  const { href, className, ...rest } = props;

  return (
    <NavbarMenuItem>
      <Button
        className={cn(
          'm-0 inline-flex w-full items-center justify-start gap-2 bg-transparent p-0 px-5 text-large hover:bg-default-300',
          className,
        )}
        as={Link}
        href={href}
        fullWidth
        {...rest}
      />
    </NavbarMenuItem>
  );
};

const NavbarContentMenu: FC<{
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
}> = ({ setIsMenuOpen }) => {
  const { user, logOut } = useAuth();
  const handleClick = () => setIsMenuOpen(false);

  return (
    <>
      <ItemMenu onClick={handleClick} href="/" startContent={<House />}>
        Home
      </ItemMenu>
      {user && (
        <>
          <ItemMenu
            onClick={handleClick}
            href={toUser(user.uid)}
            startContent={<User />}
          >
            Profile
          </ItemMenu>
          <ItemMenu
            onClick={handleClick}
            href={toCreatTopic()}
            startContent={<Plus />}
          >
            Create topic
          </ItemMenu>
          <ItemMenu
            color="danger"
            className="text-danger"
            onClick={() => {
              handleClick();
              logOut();
            }}
            href="/"
            startContent={<OpenDoor />}
          >
            Log out
          </ItemMenu>
        </>
      )}
      <NavbarMenuItem className="mb-4 mt-auto inline-flex items-center gap-1 text-small">
        Created by{' '}
        <Link href="https://github.com/Fyz-dev/" className="pr-1 text-primary">
          Fyz-dev{' '}
        </Link>
        <Link href="https://github.com/Fyz-dev/">
          <Github className="h-5 w-5" />
        </Link>
      </NavbarMenuItem>
    </>
  );
};

export default NavbarContentMenu;
