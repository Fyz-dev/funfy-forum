import { FC } from 'react';
import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/card';
import { Avatar } from '@nextui-org/avatar';
import { Button } from '@nextui-org/button';
import { Textarea } from '@nextui-org/input';
import Link from 'next/link';
import { Message } from 'src/assets/icons';
import DropDownFilter from 'src/components/ui/DropDownFilter';
import { MobileHeaderCard } from 'src/components/MobileHeaderCard';
import TopicCard from 'src/components/TopicCard/TopicCard';
import { MDXEditor } from 'src/components/MDXEditor';
import postController from 'src/api/controller/PostController';
import { notFound } from 'next/navigation';
import Comments from 'src/components/Comments/Comments';
import commentController from 'src/api/controller/CommentController';

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
    <div className="m-0 flex justify-center gap-5 lg:m-5">
      {/* overflow-auto - нужен для работы скроллинга в MDXEditor. p-10 -m-10 box-content - для починки теней. */}
      <div className="box-content flex w-full max-w-page flex-col overflow-auto lg:-m-10 lg:p-10">
        <MobileHeaderCard
          title={post.topic.title}
          mediaQuery="lg"
          photoURL={post.topic.photoURL}
          classNames={{
            body: 'bg-content1',
            wrapperSection: 'block lg:hidden',
          }}
        />
        <main className="w-full">
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
            <CardBody className="w-full gap-4 pb-0 text-default-500">
              <p>{post.content}</p>
              <Button
                radius="full"
                className="w-min bg-default-100 p-0 text-default-500"
              >
                <Message />
                <span>{post.commentCount}</span>
              </Button>
            </CardBody>
            <CardFooter className="flex flex-col items-start gap-1">
              <div className="mr-auto flex items-center gap-1">
                <span className="text-small text-default-500">Sort by: </span>
                <DropDownFilter size="sm" />
              </div>
              <div className="mb-4 flex w-full flex-col overflow-hidden">
                <MDXEditor markdown="" placeholder="Add a comment..." />
              </div>
              {/* Comments */}
              <a href="#comments" />
              <div>
                <Comments comments={comments} />
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
