import { notFound } from 'next/navigation';
import { FC } from 'react';
import { Card, CardFooter } from '@nextui-org/card';
import { Post } from 'src/components/Post';
import { User } from 'src/interface';
import { userService } from 'src/services/firebase';
import { SwitchButton } from 'src/components/User';
import DropDownFilter from 'src/components/ui/DropDownFilter';

import { posts } from 'src/app/data';
import UserCardPart from 'src/components/User/UserCardHeader';
import { Timestamp } from 'firebase/firestore';

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
    <div className="m-0 flex justify-center gap-5 sm:m-5">
      <div className="flex flex-col gap-5">
        <UserCardPart
          classNames={{
            wrapper: 'block lg:hidden',
          }}
          displayName={user.displayName}
          photoURL={user.photoURL}
          email=""
        >
          <CardFooter className="flex-row">
            <SwitchButton />
            <DropDownFilter className="ml-auto" />
          </CardFooter>
        </UserCardPart>
        <main className="mx-3 mb-5 flex max-w-[800px] flex-col items-start gap-5 sm:m-0">
          {posts.map((item, index) => {
            return (
              <Post
                vote={0}
                createdAt={Timestamp.now()}
                key={index}
                topic={item.topic}
                topicPhotoURL={item.topicPhotoURL}
                userName={item.user}
                title={item.title}
                content={item.content}
              />
            );
          })}
        </main>
      </div>
      <UserCardPart
        classNames={{
          wrapperSection: 'hidden h-min w-80 min-w-[20rem] lg:block',
        }}
        displayName={user.displayName}
        photoURL={user.photoURL}
        email=""
      />
    </div>
  );
};

export default UserPage;
