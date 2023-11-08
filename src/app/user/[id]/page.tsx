import { notFound } from 'next/navigation';
import { FC } from 'react';
import { Card, CardFooter } from '@nextui-org/card';
import { Post } from 'src/components/Post';
import { User } from 'src/models';
import { userService } from 'src/services/firebase';
import { SwitchButton } from 'src/components/User';
import DropDownFilter from 'src/components/ui/DropDownFilter';

import { posts } from 'src/app/data';
import UserCardPart from 'src/components/User/UserCardPart';

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
        <section>
          <Card className="w-full rounded-none bg-transparent shadow-none sm:rounded-large sm:bg-content1 sm:shadow-medium">
            <div className="block lg:hidden">
              <UserCardPart
                classNames={{
                  header: 'rounded-none',
                  body: '-mt-5 sm:mt-0 bg-background sm:bg-transparent rounded-t-3xl sm:rounded-large',
                }}
                displayName={user.displayName}
                photoURL={user.photoURL}
              />
            </div>
            <CardFooter className="flex-row">
              <SwitchButton />
              <DropDownFilter className="ml-auto" />
            </CardFooter>
          </Card>
        </section>
        <main className="mx-3 mb-5 flex max-w-[800px] flex-col items-start gap-5 sm:m-0">
          {posts.map((item, index) => {
            return (
              <Post
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
      <section className="hidden h-min w-80 min-w-[20rem] lg:block">
        <Card>
          <UserCardPart
            classNames={{ body: 'pb-5 px-5' }}
            displayName={user.displayName}
            photoURL={user.photoURL}
          />
        </Card>
      </section>
    </div>
  );
};

export default UserPage;
