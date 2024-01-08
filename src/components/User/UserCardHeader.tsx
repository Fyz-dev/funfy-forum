import { FC, ReactNode } from 'react';
import { Button } from '@nextui-org/button';
import { Chip } from '@nextui-org/chip';
import { IUser } from 'src/interface';
import {
  MobileHeaderCard,
  MobileHeaderProps,
} from 'src/components/MobileHeaderCard';
import { OnlyAuthor } from '../Checker';
import Link from 'next/link';
import { toProfileSetting } from 'src/utils/paths';

type UserCardPartProps = Pick<
  MobileHeaderProps,
  'classNames' | 'childrenCardBody'
> & {
  user: IUser;
  children?: ReactNode;
};

const UserCardHeader: FC<UserCardPartProps> = ({
  user,
  children,
  classNames,
  childrenCardBody,
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
          <OnlyAuthor idAuthor={user.uid}>
            <Button
              as={Link}
              href={toProfileSetting()}
              size="sm"
              className="text-small"
              radius="full"
              variant="flat"
            >
              Edit
            </Button>
          </OnlyAuthor>
        }
        childrenCardBody={
          <>
            {user.userDetails.socialNetwork.length !== 0 && (
              <div className="flex flex-row flex-wrap justify-center gap-1 gap-y-2">
                {user.userDetails.socialNetwork.map((social, key) => (
                  <Chip key={key} variant="flat">
                    {social}
                  </Chip>
                ))}
              </div>
            )}
            {childrenCardBody}
          </>
        }
      >
        {children}
      </MobileHeaderCard>
    </>
  );
};

export default UserCardHeader;
