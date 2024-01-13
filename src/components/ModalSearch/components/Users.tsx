import { Avatar } from '@nextui-org/avatar';
import Link from 'next/link';
import { FC } from 'react';
import { IUser } from 'src/interface';
import { toUser } from 'src/utils/paths';

const Users: FC<{ users: ResponsData<IUser> }> = ({ users }) => {
  return (
    <>
      {users.data.map(user => (
        <Link
          href={toUser(user.uid)}
          key={user.uid}
          className="inline-flex max-w-min select-none items-center gap-2 rounded-full bg-default-100 pr-3 transition-all hover:scale-[1.01] hover:bg-default-200 active:scale-[0.97]"
        >
          <Avatar src={user.photoURL} />
          <span className="whitespace-nowrap">{user.name}</span>
        </Link>
      ))}
    </>
  );
};

export default Users;
