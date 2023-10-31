import { notFound } from 'next/navigation';
import { FC } from 'react';
import { UserAuth } from 'src/context/Auth';
import { User } from 'src/models';
import { userService } from 'src/services/firebase';

const getUser = async (id: string): Promise<User> => {
  try {
    return await userService.getById(id);
  } catch (error) {
    notFound();
  }
};

const UserPage: FC<{ params: { id: string } }> = async ({ params }) => {
  const user = await getUser(params.id);
  return (
    <div>
      {user.displayName}
      {user.email}
      {user.photoURL}
    </div>
  );
};

export default UserPage;
