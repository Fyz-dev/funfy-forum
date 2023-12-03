import { FC, ReactNode } from 'react';
import { Button } from '@nextui-org/button';
import { Chip } from '@nextui-org/chip';
import { IUser } from 'src/interface';
import {
  MobileHeaderCard,
  MobileHeaderProps,
} from 'src/components/MobileHeaderCard';

type UserCardPartProps = Pick<MobileHeaderProps, 'classNames'> & {
  user: IUser;
  children?: ReactNode;
};

const UserCardHeader: FC<UserCardPartProps> = ({
  user,
  children,
  classNames,
}) => {
  return (
    <>
      <MobileHeaderCard
        title={user.name}
        description={user.userDetails.description}
        photoURL={user.photoURL}
        classNames={classNames}
        mediaQuery="sm"
        childrenCardHeader={
          <Button size="sm" className="text-small" radius="full" variant="flat">
            Edit
          </Button>
        }
        childrenCardBody={
          <div className="flex flex-row flex-wrap justify-center gap-1 gap-y-2">
            {user.userDetails.socialNetwork.map((social, key) => (
              <Chip key={key} variant="flat">
                {social}
              </Chip>
            ))}
          </div>
        }
      >
        {children}
      </MobileHeaderCard>
    </>
  );
};

export default UserCardHeader;
