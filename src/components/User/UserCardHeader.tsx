import { FC, ReactNode } from 'react';
import { Button } from '@nextui-org/button';
import { Chip } from '@nextui-org/chip';
import { IUser } from 'src/interface';
import {
  MobileHeaderCard,
  MobileHeaderProps,
} from 'src/components/MobileHeaderCard';

type UserCardPartProps = Omit<IUser, 'uid'> &
  Pick<MobileHeaderProps, 'classNames'> & {
    children?: ReactNode;
  };

const UserCardHeader: FC<UserCardPartProps> = ({
  name,
  email,
  photoURL,
  children,
  classNames,
}) => {
  return (
    <>
      <MobileHeaderCard
        title={name}
        photoURL={photoURL}
        classNames={classNames}
        mediaQuery="sm"
        childrenCardHeader={
          <Button size="sm" className="text-small" radius="full" variant="flat">
            Edit
          </Button>
        }
        childrenCardBody={
          <>
            <div className="flex flex-row gap-1">
              <Chip variant="flat">Github</Chip>
              <Chip variant="flat">Reddit</Chip>
              <Chip variant="flat">Telegram</Chip>
            </div>
            <p className="self-start">
              The creator of this site, and a programming enthusiast
            </p>
          </>
        }
      >
        {children}
      </MobileHeaderCard>
    </>
  );
};

export default UserCardHeader;
