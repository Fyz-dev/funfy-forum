import { NavbarMenu, Navbar as NextUINavbar } from '@nextui-org/navbar';
import { usePathname } from 'next/navigation';
import { FC, ReactNode, useEffect, useState } from 'react';
import NavbarContentMenu from './NavbarContentMenu';

const Navbar: FC<{ children: ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const path = usePathname();

  useEffect(() => {
    if (isMenuOpen) setIsMenuOpen(false);

    //eslint-disable-next-line
  }, [path]);

  return (
    <NextUINavbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className="overflow-hidden"
      classNames={{ wrapper: 'w-full max-w-none' }}
    >
      {children}
      <NavbarMenu>
        <NavbarContentMenu setIsMenuOpen={setIsMenuOpen} />
      </NavbarMenu>
    </NextUINavbar>
  );
};

export default Navbar;
