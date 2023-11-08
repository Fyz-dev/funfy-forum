import { FC } from 'react';
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import { Avatar } from '@nextui-org/avatar';
import { Button } from '@nextui-org/button';
import { Chip } from '@nextui-org/chip';
import { User } from 'src/models';
import Image from 'next/image';

type UserCardPartProps = Omit<User, 'uid'> & {
  classNames?: { header?: string; body?: string };
};

const UserCardPart: FC<UserCardPartProps> = ({
  displayName,
  email,
  photoURL,
  classNames,
}) => {
  return (
    <>
      <CardHeader
        className={`flex h-20 items-start justify-end bg-gradient-to-r from-pink-500 to-indigo-500 ${classNames?.header}`}
      >
        <Button size="sm" className="text-small" radius="full" variant="flat">
          Edit
        </Button>
      </CardHeader>

      <CardBody
        className={`z-10 flex items-center gap-2 overflow-visible ${classNames?.body}`}
      >
        <Avatar
          className="-mt-11 h-16 w-16 self-center text-large"
          src={photoURL}
        />
        <h6 className="text-xl">{displayName}</h6>
        <div className="flex flex-row gap-1">
          <Chip variant="flat">Github</Chip>
          <Chip variant="flat">Reddit</Chip>
          <Chip variant="flat">Telegram</Chip>
        </div>
        <p className="self-start">
          The creator of this site, and a programming enthusiast
        </p>
      </CardBody>
    </>
  );
};

export default UserCardPart;
