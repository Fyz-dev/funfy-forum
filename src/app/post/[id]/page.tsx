import { FC } from 'react';
import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/card';
import { Avatar } from '@nextui-org/avatar';
import { Button } from '@nextui-org/button';
import Link from 'next/link';
import { Message, Comments as CommentsIcon } from 'src/assets/icons';
import DropDownSort, { DropDownConfig } from 'src/components/ui/DropDownSort';
import { MobileHeaderCard } from 'src/components/MobileHeaderCard';
import TopicCard from 'src/components/TopicCard/TopicCard';
import postController from 'src/api/controller/PostController';
import { notFound } from 'next/navigation';
import Comments from 'src/components/Comments/Comments';
import commentController from 'src/api/controller/CommentController';
import { Divider } from '@nextui-org/divider';
import CreateComment from './(components)/CreateComment';

const getPost = async (id: string) => {
  try {
    return await postController.getById(id);
  } catch (error) {
    notFound();
  }
};

const PostPage: FC<{ params: { id: string } }> = async ({ params: { id } }) => {
  const post = await getPost(id);
  const comments = await commentController.getByPost(post.id);

  return (
    <div className="m-0 flex h-screen justify-center gap-5 lg:m-5 lg:h-auto">
      {/* overflow-auto - нужен для работы скроллинга в MDXEditor. p-10 -m-10 box-content - для починки теней. */}
      <div className="box-content flex w-full max-w-page flex-col lg:-m-10 lg:overflow-auto lg:p-10">
        <MobileHeaderCard
          title={post.topic.name}
          hrefTitle={`/topic/${post.topic.id}`}
          mediaQuery="lg"
          photoURL={post.topic.photoURL}
          classNames={{
            body: 'bg-content1',
            wrapperSection: 'block lg:hidden',
          }}
        />
        <main className="h-full w-full bg-content1 lg:bg-transparent">
          <Card className="w-full rounded-none p-1 shadow-none lg:rounded-large lg:shadow-medium">
            <CardHeader className="flex flex-col gap-3 pb-2">
              {/* Info author */}
              <div className="mr-auto inline-flex items-center gap-2">
                <Avatar
                  href={`/user/${post.user.uid}`}
                  as={Link}
                  radius="full"
                  size="md"
                  src={post.user.photoURL || ''}
                />
                <div className="text-small text-default-500">
                  <h2>
                    Posted by{' '}
                    <Link
                      href={`/user/${post.user.uid}`}
                      className="text-primary"
                    >
                      {post.user.name}
                    </Link>
                  </h2>
                  <span>{post.timestamp.createdAt.toDate().toUTCString()}</span>
                </div>
              </div>
              {/* Title */}
              <h1 className="self-start text-2xl">{post.title}</h1>
            </CardHeader>
            {/* Main content post */}
            <CardBody className="w-full gap-3 pb-2 text-default-500">
              <p>{post.content}</p>
              <Button
                radius="full"
                className="w-min bg-default-100 p-0 text-default-500"
              >
                <Message />
                <span>{post.commentCount}</span>
              </Button>
            </CardBody>
            <CardFooter className="flex flex-col  items-start gap-1">
              <div className="mb-4 flex w-full flex-col gap-1 overflow-hidden">
                <span>
                  Comment as{' '}
                  <Link
                    className="text-primary"
                    href={`/user/${post.user.uid}`}
                  >
                    {post.user.name}
                  </Link>
                </span>
                <CreateComment />
              </div>
              {comments.length !== 0 ? (
                <>
                  <div className="mr-auto flex items-center gap-1">
                    <span className="text-small text-default-500">
                      Sort by:{' '}
                    </span>
                    <DropDownSort
                      {...DropDownConfig}
                      classNames={{
                        trigger:
                          'shadow-none transition-all w-[7rem] py-0 min-h-8 h-unit-8 rounded-full',
                      }}
                    />
                  </div>
                  <Divider />
                </>
              ) : (
                ''
              )}
              {/* Comments */}
              <a href="#comments" />
              <div className="h-full w-full">
                {comments.length !== 0 ? (
                  <Comments comments={comments} />
                ) : (
                  <div className="m-10 flex h-full flex-col items-center justify-center gap-3 text-default-500">
                    <CommentsIcon className="h-16 w-16" />
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-medium">Nothing Here</span>
                      <span className="text-center text-medium">
                        You can be the first to tell your thoughts!
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </CardFooter>
          </Card>
        </main>
      </div>

      {/* Информация о топике*/}
      <section className="hidden items-center lg:flex">
        <TopicCard topic={post.topic} />
      </section>
    </div>
  );
};

export default PostPage;
