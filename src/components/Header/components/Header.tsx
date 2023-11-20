import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from '@nextui-org/navbar';
import { FC } from 'react';
import Link from 'next/link';
import UserLayout from './UserLayout';
import ThemeSwitcher from 'src/components/ThemeSwitcher';
import { Avatar } from '@nextui-org/avatar';
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import { dataHeader } from './data';
import { Create, Search } from 'src/assets/icons';

const Header: FC = () => {
  return (
    <Navbar isBordered classNames={{ wrapper: 'w-full max-w-none' }}>
      <NavbarContent justify="start">
        <NavbarMenuToggle className="sm:hidden" />
        <NavbarBrand>
          <Link
            href="/"
            className="inline-flex items-center gap-1 font-bold text-inherit"
          >
            <Avatar
              size="md"
              src="https://assets.stickpng.com/images/6002f95551c2ec00048c6c70.png"
            />
            Funfy
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        justify="center"
        className="hidden w-full p-40 md:flex md:p-20 "
      >
        <NavbarItem className="flex w-full flex-row items-center gap-2">
          <Input
            startContent={<Search />}
            variant="flat"
            placeholder="Find topic, or post"
            size="sm"
            radius="full"
            fullWidth
          />

          <Button href="/post/create/" color="primary" as={Link}>
            Create Post
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end" className="gap-2">
        <NavbarItem className="flex md:hidden">
          <Button disableRipple isIconOnly variant="light" size="sm">
            <Create className="h-4 w-4" />
          </Button>
        </NavbarItem>
        <ThemeSwitcher />
        <UserLayout />
      </NavbarContent>

      <NavbarMenu>
        <NavbarMenuItem>
          <Input
            startContent={<Search />}
            variant="flat"
            placeholder="Find topic, or post"
          />
        </NavbarMenuItem>
        {dataHeader.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link href="/">{item}</Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};

export default Header;
