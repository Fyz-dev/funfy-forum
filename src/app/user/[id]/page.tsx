import { notFound } from 'next/navigation';
import { FC } from 'react';
import { CardFooter } from '@nextui-org/card';
import { SwitchButton } from 'src/components/User';
import DropDownFilter from 'src/components/ui/DropDownFilter';

import UserCardPart from 'src/components/User/UserCardHeader';
import { IUser } from 'src/interface';
import userController from 'src/api/controller/UserController';
import postController from 'src/api/controller/PostController';
import { Post } from 'src/components/Post';

const getUser = async (id: string): Promise<IUser> => {
  try {
    return await userController.getById(id);
  } catch (error) {
    notFound();
  }
};

const UserPage: FC<{ params: { id: string } }> = async ({ params }) => {
  const user = await getUser(params.id);
  const posts = await postController.getByUser(params.id);

  return (
    <div className="m-0 flex justify-center gap-5 sm:m-5">
      <div className="flex w-full max-w-smpage flex-col gap-5">
        <UserCardPart
          classNames={{
            wrapper: 'block lg:hidden',
          }}
          user={user}
        >
          <CardFooter className="flex-row">
            <SwitchButton />
            <DropDownFilter className="ml-auto" />
          </CardFooter>
        </UserCardPart>
        <main className="x-3 mb-5 flex w-full flex-col items-start gap-5 sm:m-0">
          {posts
            ? posts.map(item => {
                return <Post key={item.id} post={item} />;
              })
            : ''}
        </main>
      </div>
      <UserCardPart
        classNames={{
          wrapperSection: 'hidden h-min w-80 min-w-[20rem] lg:block',
        }}
        user={user}
      />
    </div>
  );
};

export default UserPage;
