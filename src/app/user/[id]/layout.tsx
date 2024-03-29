import { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { CardFooter } from '@nextui-org/card';
import { UserCardHeader } from 'src/components/User';
import { IUser } from 'src/interface';
import { RedirectTabs } from 'src/components/ui/RedirectTabs';
import SwitchSort from './(components)/SwitchSort';
import { toUser } from 'src/utils/paths';
import { getStatsByUser, getUserById } from 'src/api/supabase';
import { Stats } from 'src/components/Stats';
import { MobileStats } from 'src/components/MobileStats';

const getUser = async (id: string): Promise<IUser> => {
  try {
    return await getUserById(id);
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
          childrenCardHeader={
            <MobileStats
              headerText="User statistics"
              stats={getStatsByUser(user.uid)}
            />
          }
        >
          <CardFooter className="flex-row justify-between">
            <RedirectTabs
              baseUrl={toUser(params.id)}
              tabs={[
                { name: 'Posts', href: 'posts' },
                { name: 'Comments', href: 'comments' },
              ]}
            />
            <SwitchSort />
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
        childrenCardBody={<Stats stats={getStatsByUser(user.uid)} />}
      />
    </div>
  );
}
