import { ReactNode } from 'react';
import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/card';
import { Avatar } from '@nextui-org/avatar';
import { Button } from '@nextui-org/button';
import Link from 'next/link';
import { Edit, Message } from 'src/assets/icons';
import { MobileHeaderCard } from 'src/components/MobileHeaderCard';
import TopicCard from 'src/components/TopicCard/TopicCard';
import { notFound } from 'next/navigation';
import { toTopic, toUser } from 'src/utils/paths';
import { formatDateFull } from 'src/utils';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getPostById } from 'src/api/supabase';
import { EditContent } from 'src/components/EditContent';
import { Input } from 'src/components/ui/Input';
import { ToggleEdit } from 'src/components/ToggleEdit';
import { EditPostContextProvider } from 'src/context/Edit';
import { MDXEditor } from 'src/components/MDXEditor';
import SubmitEdit from './(components)/SubmitEdit';

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
        <main className="h-full w-full bg-content1 lg:bg-transparent">
          <Card className="static w-full rounded-none p-0 shadow-none lg:rounded-large lg:shadow-medium">
            <EditPostContextProvider
              defaultValues={{ topicID: post.topic.id, isNSFW: post.isNSFW }}
            >
              {/* ---- Mobile Info Topic ---- */}
              <MobileHeaderCard
                title={post.topic.name}
                hrefTitle={toTopic(post.topic.id)}
                mediaQuery="lg"
                photoURL={post.topic.photoURL}
                classNames={{
                  body: 'bg-content1',
                  wrapperSection: 'block lg:hidden',
                }}
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
                {/* ---- Info author ---- */}
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
                {/* ---- Title ---- */}
                <EditContent
                  forEdit={
                    <Input
                      name="title"
                      variant="bordered"
                      placeholder="Title"
                      defaultValue={post.title}
                      classNames={{ input: '!text-2xl' }}
                    />
                  }
                >
                  <h1 className="self-start text-2xl">{post.title}</h1>
                </EditContent>
              </CardHeader>

              {/* ---- Main content post ---- */}
              <CardBody className="w-full gap-5 pb-4 pt-0">
                <EditContent
                  forEdit={
                    <MDXEditor name="content" markdown={post.content || ''} />
                  }
                >
                  <div className="prose w-full min-w-full text-default-500 prose-headings:text-default-500 prose-strong:text-default-500 prose-em:text-default-500">
                    <MDXRemote source={post.content || ''} />
                  </div>
                </EditContent>

                <SubmitEdit />

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
            </EditPostContextProvider>

            {/* ---- Comments block ---- */}
            <CardFooter className="flex flex-col items-start gap-1">
              <a id="comments" href="#comments" />
              {children}
            </CardFooter>
          </Card>
        </main>
      </div>

      {/* ---- PC Info Topic ---- */}
      <section className="hidden items-center lg:flex">
        <TopicCard topic={post.topic} />
      </section>
    </div>
  );
}
