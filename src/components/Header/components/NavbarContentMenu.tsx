'use client';

import { NavbarMenuItem } from '@nextui-org/navbar';
import { Button, ButtonProps } from '@nextui-org/button';
import { Dispatch, FC, SetStateAction } from 'react';
import Link, { LinkProps } from 'next/link';
import {
  Github,
  User,
  Plus,
  OpenDoor,
  House,
  Settings,
  SunIcon,
  MoonIcon,
} from 'src/assets/icons';
import { Divider, cn } from '@nextui-org/react';
import { useAuth } from 'src/context/Auth';
import {
  toCreatTopic,
  toProfileSetting,
  toUser,
  toUserComments,
  toUserPosts,
} from 'src/utils/paths';
import { usePathname } from 'next/navigation';
import { Avatar } from '@nextui-org/avatar';
import { Tabs, Tab } from '@nextui-org/tabs';
import { useTheme } from 'next-themes';

const ItemMenu: FC<ButtonProps & Pick<LinkProps, 'href'>> = props => {
  const { href, className, ...rest } = props;

  return (
    <NavbarMenuItem>
      <Button
        className={cn(
          'm-0 inline-flex w-full items-center justify-start gap-2 bg-transparent p-0 px-2 text-large hover:bg-default-300',
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
  const path = usePathname();
  const { resolvedTheme, theme, setTheme } = useTheme();

  const handleClick = () => setIsMenuOpen(false);

  return (
    <>
      {/* <---- Header user ----> */}
      {user && (
        <NavbarMenuItem>
          <div className="flex items-center justify-center">
            <Link
              onClick={handleClick}
              href={toUser(user.uid)}
              className="flex flex-col items-center justify-center"
            >
              <Avatar size="lg" src={user.photoURL} />
              <h1>{user.name}</h1>
            </Link>
          </div>
        </NavbarMenuItem>
      )}

      <Divider className="-mx-12 min-w-[calc(100%+3rem)] self-center" />
      <NavbarMenuItem>
        <span className="text-medium text-default-400">Theme</span>
        <Tabs
          onSelectionChange={key => setTheme(key.toString())}
          defaultSelectedKey={theme === 'system' ? resolvedTheme : theme}
          classNames={{ base: 'min-w-full', tabList: 'min-w-full' }}
        >
          <Tab
            key="light"
            title={
              <div className="flex items-center space-x-2">
                <SunIcon />
                <span>Light</span>
              </div>
            }
          />
          <Tab
            key="dark"
            title={
              <div className="flex items-center space-x-2">
                <MoonIcon />
                <span>Dark</span>
              </div>
            }
          />
        </Tabs>
      </NavbarMenuItem>
      <Divider className="-mx-12 min-w-[calc(100%+3rem)] self-center" />

      {/* <---- Main menu content ----> */}
      <ItemMenu
        onClick={handleClick}
        href="/"
        startContent={<House />}
        className={cn(path === '/' && 'text-primary')}
      >
        Home
      </ItemMenu>

      {user && (
        <>
          <ItemMenu
            onClick={handleClick}
            href={toUser(user.uid)}
            startContent={<User />}
            className={cn(
              (path === toUserPosts(user.uid) ||
                path === toUserComments(user.uid)) &&
                'text-primary',
            )}
          >
            Profile
          </ItemMenu>
          <ItemMenu
            onClick={handleClick}
            href={toCreatTopic()}
            startContent={<Plus />}
            className={cn(path === toCreatTopic() && 'text-primary')}
          >
            Create topic
          </ItemMenu>
          <ItemMenu
            onClick={handleClick}
            href={toProfileSetting()}
            startContent={<Settings />}
            className={cn(path === toProfileSetting() && 'text-primary')}
          >
            Profile settings
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
