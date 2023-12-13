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
import { Create, Github, Search } from 'src/assets/icons';
import { toCreatPost } from 'src/utils/paths';

const Header: FC = () => {
  return (
    <Navbar
      isBordered
      className="overflow-hidden"
      classNames={{ wrapper: 'w-full max-w-none' }}
    >
      <NavbarContent justify="start">
        <NavbarMenuToggle className="sm:hidden" />
        <NavbarBrand>
          <Link
            href="/"
            className="relative inline-flex items-center gap-1 text-large font-bold text-inherit"
          >
            <Avatar
              size="md"
              src="funfy256.png"
              className="rounded-none bg-transparent"
            />
            <span>Funfy</span>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        justify="center"
        className="hidden w-full sm:flex sm:px-7 md:px-14 lg:px-28"
      >
        <NavbarItem className="flex w-full flex-row items-center gap-2">
          <Input
            startContent={<Search />}
            variant="faded"
            placeholder="Find topic, or post"
            size="sm"
            radius="full"
            fullWidth
            classNames={{
              mainWrapper: 'min-h-unit-10',
              inputWrapper: 'max-h-unit-10',
            }}
          />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end" className="gap-2">
        <NavbarItem className="sm:hidden">
          <Button
            as={Link}
            href={toCreatPost()}
            disableRipple
            isIconOnly
            variant="light"
            size="sm"
            className="group"
          >
            <Search className="h-4 w-4 transition group-hover:scale-110" />
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button
            as={Link}
            href={toCreatPost()}
            disableRipple
            isIconOnly
            variant="light"
            size="sm"
            className="group"
          >
            <Create className="h-4 w-4 transition group-hover:scale-110" />
          </Button>
        </NavbarItem>
        <ThemeSwitcher />
        <UserLayout />
      </NavbarContent>

      <NavbarMenu>
        {dataHeader.map((item, index) => (
          <NavbarMenuItem key={`${item.value}-${index}`}>
            <Button
              className={`m-0 inline-flex w-full items-center ${
                dataHeader.length - 1 === index && 'text-danger'
              } justify-start gap-2 bg-transparent p-0 px-5 text-large hover:bg-default-300`}
              as={Link}
              href={item.href}
              fullWidth
            >
              {item.icon}
              <span>{item.value}</span>
            </Button>
          </NavbarMenuItem>
        ))}
        <NavbarMenuItem className="mb-4 mt-auto inline-flex items-center gap-1 text-small">
          Created by
          <Link href="/" className="pr-1 text-primary">
            Fyz-dev
          </Link>
          <Link href="https://github.com/Fyz-dev/">
            <Github className="h-5 w-5" />
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
};

export default Header;
