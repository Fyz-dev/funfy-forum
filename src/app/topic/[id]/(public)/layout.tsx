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
import { Hashtag, SortNew, SortOld } from 'src/assets/icons';
import { toTopic } from 'src/utils/paths';
import { OnlyAuthor } from 'src/components/Checker';
import { getStatsByTopic, getTopicById } from 'src/api/supabase';
import Link from 'next/link';
import { Stats } from 'src/components/Stats';
import { MobileStats } from 'src/components/MobileStats';

const TopicCardHeader: FC<
  { topic: ITopic; children?: ReactNode } & Pick<
    MobileHeaderProps,
    'classNames' | 'childrenCardBody' | 'childrenCardHeader'
  >
> = ({ topic, children, classNames, childrenCardBody, childrenCardHeader }) => {
  return (
    <MobileHeaderCard
      title={topic.name}
      description={
        topic.description ? topic.description : `Welcom to ${topic.name}!`
      }
      photoURL={topic.photoURL}
      classNames={classNames}
      mediaQuery="sm"
      fallback={<Hashtag className="h-10 w-10 text-primary" />}
      childrenCardHeader={
        <>
          {childrenCardHeader}
          <OnlyAuthor idAuthor={topic.userID}>
            <Button
              as={Link}
              href="edit"
              size="sm"
              className="text-small"
              radius="full"
              variant="flat"
            >
              Edit
            </Button>
          </OnlyAuthor>
        </>
      }
      childrenCardBody={childrenCardBody}
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
          childrenCardHeader={
            <MobileStats
              headerText="Topic statistics"
              stats={getStatsByTopic(topic.id)}
            />
          }
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
        childrenCardBody={<Stats stats={getStatsByTopic(topic.id)} />}
      />
    </div>
  );
}
