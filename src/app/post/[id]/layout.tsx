import { ReactNode } from 'react';
import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/card';
import { Avatar } from '@nextui-org/avatar';
import { Button } from '@nextui-org/button';
import Link from 'next/link';
import { Edit, Hashtag, Message } from 'src/assets/icons';
import { MobileHeaderCard } from 'src/components/MobileHeaderCard';
import TopicCard from 'src/components/TopicCard/TopicCard';
import { notFound } from 'next/navigation';
import { toTopic, toUser } from 'src/utils/paths';
import { formatDateFull } from 'src/utils';
import { getPostById, getStatsByTopic } from 'src/api/supabase';
import { ToggleEdit } from 'src/components/ToggleEdit';
import { EditContextProvider } from 'src/context/Edit';
import EditContentPost from './(components)/EditContentPost';
import { MDXRender } from 'src/components/MDXRender';

const getPost = async (id: string) => {
  try {
    return await getPostById(id);
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
  const post = await getPost(params.id);

  return (
    <div className="m-0 flex justify-center gap-5 sm:m-5 lg:h-auto">
      {/* overflow-auto - нужен для работы скроллинга в MDXEditor. p-10 -m-10 box-content - для починки теней. */}
      <div className="box-content flex h-full w-full max-w-page flex-col max-lg:rounded-medium max-lg:shadow-medium max-sm:h-screen max-sm:min-h-screen max-sm:rounded-none max-sm:shadow-none sm:overflow-hidden lg:-m-10 lg:overflow-auto lg:p-10">
        <EditContextProvider>
          <main className="h-full w-full bg-content1 lg:bg-transparent">
            <Card className="static w-full rounded-none p-0 shadow-none lg:rounded-large lg:shadow-medium">
              {/* <---- Mobile Info Topic ----> */}
              <MobileHeaderCard
                title={post.topic.name}
                hrefTitle={toTopic(post.topic.id)}
                mediaQuery="lg"
                photoURL={post.topic.photoURL}
                classNames={{
                  body: 'bg-content1',
                  wrapperSection: 'block lg:hidden',
                }}
                fallback={<Hashtag className="h-8 w-8 text-primary" />}
                childrenCardHeader={
                  <ToggleEdit
                    className="ml-auto lg:hidden"
                    radius="full"
                    variant="light"
                    isIconOnly
                    idAuthor={post.user.uid}
                  >
                    <Edit className="h-5 w-5" />
                  </ToggleEdit>
                }
              />

              <CardHeader className="flex flex-col gap-3 pb-2">
                {/* <---- Info author ----> */}
                <div className="inline-flex w-full items-center justify-start gap-2 self-start">
                  <Avatar
                    href={toUser(post.user.uid)}
                    as={Link}
                    radius="full"
                    size="md"
                    src={post.user.photoURL}
                  />
                  <div className="text-small text-default-500">
                    <h2>
                      Posted by{' '}
                      <Link
                        href={toUser(post.user.uid)}
                        className="text-primary"
                      >
                        {post.user.name}
                      </Link>
                    </h2>
                    <span>{formatDateFull(post.timestamp.createdAt)}</span>
                  </div>
                  <ToggleEdit
                    className="ml-auto max-lg:hidden"
                    radius="full"
                    variant="light"
                    isIconOnly
                    idAuthor={post.user.uid}
                  >
                    <Edit className="h-5 w-5" />
                  </ToggleEdit>
                </div>
              </CardHeader>

              <CardBody className="w-full gap-5 pb-4">
                <EditContentPost
                  post={post}
                  defaultValues={{
                    topicID: post.topic.id,
                    isNSFW: post.isNSFW,
                  }}
                >
                  <div className="flex w-full flex-col gap-2 overflow-hidden">
                    {/* <---- Title ----> */}
                    <h1 className="self-start overflow-hidden break-all text-2xl">
                      {post.title}
                    </h1>

                    {/* <---- Main content post ----> */}
                    <div className="w-full min-w-full">
                      <MDXRender className="text-foreground-600">
                        {post.content}
                      </MDXRender>
                    </div>
                  </div>
                </EditContentPost>
                <Button
                  radius="full"
                  className="h-unit-9 w-min bg-default-100 p-0 text-default-500"
                  as={Link}
                  href="#comments"
                >
                  <Message />
                  <span>{post.commentCount}</span>
                </Button>
              </CardBody>

              {/* <---- Comments block ----> */}
              <CardFooter className="flex flex-col items-start gap-1">
                <a id="comments" href="#comments" />
                {children}
              </CardFooter>
            </Card>
          </main>
        </EditContextProvider>
      </div>

      {/* <---- PC Info Topic ----> */}
      <section className="hidden items-center lg:flex">
        <TopicCard stats={getStatsByTopic(post.topic.id)} topic={post.topic} />
      </section>
    </div>
  );
}
