import { notFound } from 'next/navigation';
import { FC, ReactNode } from 'react';
import { CardFooter } from '@nextui-org/card';
import { SwitchButton } from 'src/components/User';
import DropDownFilter from 'src/components/ui/DropDownFilter';
import UserCardPart from 'src/components/User/UserCardHeader';
import postController from 'src/api/controller/PostController';
import { Post } from 'src/components/Post';
import { ITopic } from 'src/interface';
import topicController from 'src/api/controller/TopicController';
import {
  MobileHeaderCard,
  MobileHeaderProps,
} from 'src/components/MobileHeaderCard';
import { Button } from '@nextui-org/button';

const TopicCardHeader: FC<
  { topic: ITopic; children?: ReactNode } & Pick<
    MobileHeaderProps,
    'classNames'
  >
> = ({ topic, children, classNames }) => {
  return (
    <MobileHeaderCard
      title={topic.title}
      description={topic.description}
      photoURL={topic.photoURL}
      classNames={classNames}
      mediaQuery="sm"
      childrenCardHeader={
        <Button size="sm" className="text-small" radius="full" variant="flat">
          Edit
        </Button>
      }
    >
      {children}
    </MobileHeaderCard>
  );
};

const getTopic = async (id: string): Promise<ITopic> => {
  try {
    return await topicController.getById(id);
  } catch (error) {
    notFound();
  }
};

const TopicPage: FC<{ params: { id: string } }> = async ({ params }) => {
  const topic = await getTopic(params.id);
  const posts = await postController.getByTopic(params.id);

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
            <SwitchButton tabs={['New', 'Old']} />
          </CardFooter>
        </TopicCardHeader>
        <main className="mx-3 mb-5 flex flex-col items-start gap-5 sm:m-0">
          {posts &&
            posts.map(item => {
              return <Post key={item.id} post={item} />;
            })}
        </main>
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
};

export default TopicPage;
