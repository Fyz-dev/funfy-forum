import { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { CardFooter } from '@nextui-org/card';
import DropDownFilter from 'src/components/ui/DropDownFilter';
import { UserCardHeader } from 'src/components/User';
import { IUser } from 'src/interface';
import { userController } from 'src/api/controller';
import { RedirectTabs } from 'src/components/ui/RedirectTabs';

const getUser = async (id: string): Promise<IUser> => {
  try {
    return await userController.getById(id);
  } catch (error) {
    notFound();
  }
};

export default async function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: { id: string };
}) {
  const user = await getUser(params.id);

  return (
    <div className="m-0 flex justify-center gap-5 sm:m-5">
      <div className="flex w-full max-w-smpage flex-col gap-5">
        <UserCardHeader
          classNames={{
            wrapper: 'block lg:hidden',
          }}
          user={user}
        >
          <CardFooter className="flex-row">
            <RedirectTabs
              baseUrl={`/user/${params.id}`}
              tabs={[
                { name: 'Posts', href: 'posts' },
                { name: 'Comments', href: 'comments' },
              ]}
            />
            <DropDownFilter className="ml-auto" />
          </CardFooter>
        </UserCardHeader>
        {children}
      </div>
      <UserCardHeader
        classNames={{
          wrapperSection:
            'hidden sticky top-20 h-min w-80 min-w-[20rem] lg:block',
        }}
        user={user}
      />
    </div>
  );
}
