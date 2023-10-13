'use client';
import { FC } from 'react';
import { Button } from '@nextui-org/button';
import { User } from '@nextui-org/user';

import { UserAuth } from 'src/context/Auth';

const HeaderUser: FC = () => {
  const { user } = UserAuth();
  return (
    <Button
      color="primary"
      variant="light"
      className="rounded-md text-foreground"
    >
      <User
        name={user?.displayName}
        avatarProps={{
          src: user?.photoURL ?? '',
          size: 'sm',
        }}
      />
    </Button>
  );
};

export default HeaderUser;
