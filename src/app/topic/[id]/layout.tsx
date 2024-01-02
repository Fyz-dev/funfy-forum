import { notFound } from 'next/navigation';
import { FC, ReactNode } from 'react';
import { CardFooter } from '@nextui-org/card';
import { ITopic } from 'src/interface';
import {
  MobileHeaderCard,
  MobileHeaderProps,
} from 'src/components/MobileHeaderCard';
import { Button } from '@nextui-org/button';
import { RedirectTabs } from 'src/components/ui/RedirectTabs';
import { SortNew, SortOld } from 'src/assets/icons';
import { toTopic } from 'src/utils/paths';
import { OnlyAuthor } from 'src/components/Checker';
import { getTopicById } from 'src/api/supabase';

const TopicCardHeader: FC<
  { topic: ITopic; children?: ReactNode } & Pick<
    MobileHeaderProps,
    'classNames'
  >
> = ({ topic, children, classNames }) => {
  return (
    <MobileHeaderCard
      title={topic.name}
      description={topic.description}
      photoURL={topic.photoURL}
      classNames={classNames}
      mediaQuery="sm"
      childrenCardHeader={
        <OnlyAuthor idAuthor={topic.userID}>
          <Button size="sm" className="text-small" radius="full" variant="flat">
            Edit
          </Button>
        </OnlyAuthor>
      }
    >
      {children}
    </MobileHeaderCard>
  );
};

const getTopic = async (id: string): Promise<ITopic> => {
  try {
    return await getTopicById(id);
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
  const topic = await getTopic(params.id);

  return (
    <div className="m-0 flex justify-center gap-5 sm:m-5">
      <div className="flex w-full max-w-smpage flex-col gap-5">
        <TopicCardHeader
          topic={topic}
          classNames={{
            wrapper: 'block lg:hidden',
          }}
        >
          <CardFooter className="flex-row">
            <RedirectTabs
              baseUrl={toTopic(params.id)}
              tabs={[
                { name: 'New', href: 'new', icon: <SortNew /> },
                { name: 'Old', href: 'old', icon: <SortOld /> },
              ]}
            />
          </CardFooter>
        </TopicCardHeader>
        {children}
      </div>
      <TopicCardHeader
        topic={topic}
        classNames={{
          wrapperSection:
            'hidden sticky top-20 h-min w-80 min-w-[20rem] lg:block',
        }}
      />
    </div>
  );
}
