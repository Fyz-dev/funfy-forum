import { NavbarItem } from '@nextui-org/react';
import { FC } from 'react';
import ThemeSwitcher from 'src/components/ThemeSwitcher';
import { Button } from '@nextui-org/button';
import { Create } from 'src/assets/icons';
import { toCreatPost } from 'src/utils/paths';
import { OnlyAuthorization } from 'src/components/Checker';
import Link from 'next/link';
import TriggerSearch from './TriggerSearch';
import UserLayout from './UserLayout';

const NavbarContentTop: FC = () => {
  return (
    <>
      <NavbarItem className="flex w-full flex-row justify-end ">
        <TriggerSearch />
      </NavbarItem>
      <OnlyAuthorization>
        <NavbarItem>
          <Button
            as={Link}
            href={toCreatPost()}
            disableRipple
            isIconOnly
            variant="light"
            size="md"
            className="group"
          >
            <Create className="h-5 w-5 transition group-hover:scale-110" />
          </Button>
        </NavbarItem>
      </OnlyAuthorization>
      <div className="max-sm:hidden">
        <ThemeSwitcher />
      </div>
      <UserLayout />
    </>
  );
};

export default NavbarContentTop;
