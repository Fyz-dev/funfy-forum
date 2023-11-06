import { FC } from 'react';
import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/card';
import { Avatar } from '@nextui-org/avatar';
import { Button } from '@nextui-org/button';
import { Textarea } from '@nextui-org/input';
import Link from 'next/link';
import Comment from 'src/components/Comment';
import { Message, ArrowDown } from 'src/assets/icons';

const infoComment = {
  user: 'Fyz4567890123',
  avatarUser:
    'https://instasize.com/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fmunkee%2Fimage%2Fupload%2Fv1684429920%2Finstasize-website%2Flearn%2Favatar-robot-discord.webp&w=828&q=75',
  voteCount: 78,
  content:
    ' I would not be surprised the way YouTube has been going recently 😂 &quot;YouTube premium plus, starting at 39.99 per month for analmost fully ad free experience&quot;',
};

const PostPage: FC<{ params: { id: string } }> = async ({ params }) => {
  return (
    <div className="mt-12 flex justify-center gap-5 xl:m-5">
      <main className="flex w-[1024px]">
        <Card className="w-full overflow-visible rounded-none rounded-t-3xl p-1 md:p-3 xl:rounded-large">
          <div className=" flex flex-col items-center self-center xl:hidden">
            <Avatar
              radius="full"
              src="https://b.thumbs.redditmedia.com/8RJ1zsSxLbTrSrRAhziwMynfkWVcuFNMXPsLqtGct1o.png"
              className=" -mt-10 h-14 w-14 "
            />
            <h3 className="text-2xl">Node.js</h3>
          </div>
          <CardHeader className="flex flex-col gap-3 pb-2">
            {/* Info author */}
            <div className="mr-auto inline-flex items-center gap-2">
              <Avatar
                radius="full"
                size="md"
                src="https://instasize.com/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fmunkee%2Fimage%2Fupload%2Fv1684429920%2Finstasize-website%2Flearn%2Favatar-robot-discord.webp&w=828&q=75"
              />
              <div className="text-small text-default-500">
                <h2>
                  Posted by{' '}
                  <Link href="#" className="text-primary">
                    Fyz
                  </Link>
                </h2>
                <span>November 5 2023 5.53 PM</span>
              </div>
            </div>
            {/* Title */}
            <h1 className="self-start text-2xl">
              Almost 1 sec added latency for DNS resolution during high
              concurrency
            </h1>
          </CardHeader>
          {/* Main content post */}
          <CardBody className="gap-4 p-3 pb-0 text-default-500">
            <p>
              We have a Node v14 Express based application (hosted in AWS) which
              makes a REST based call to another service hosted in AWS. We have
              observed during our load testing that during scale the latency
              increased to almost 1 second for the original application while
              the called application was responding in 1 ms. After hours of
              debugging, we found the culprit to be DNS. We were directly
              hitting AWS ALB DNS address and after changing it to IP Address
              (we had a single instance), the latency came down to 5ms. I have
              read online that DNS resolution in node is blocking and that is
              the culprit. However, what is the solution going forward? Since we
              are using route 53, and if I create an A record pointing to ALB,
              we dont have capability to provide TTL.
            </p>
            <Button
              radius="full"
              className="w-min bg-default-100 p-0 text-default-500"
            >
              <Message />5
            </Button>
          </CardBody>
          <CardFooter className="flex flex-col items-start gap-1">
            <div className="mr-auto flex items-center gap-1">
              <span className="text-small text-default-500">Sort by: </span>
              <Button size="sm" radius="full" className="gap-1 bg-transparent">
                <span>Best</span>
                <ArrowDown />
              </Button>
            </div>
            <Textarea placeholder="Add a comment"></Textarea>
            <div>
              <Comment
                userName={infoComment.user}
                voteCount={infoComment.voteCount}
                avatarUser={infoComment.avatarUser}
                content={infoComment.content}
              >
                <Comment
                  userName={infoComment.user}
                  voteCount={infoComment.voteCount}
                  avatarUser={infoComment.avatarUser}
                  content={infoComment.content}
                />
                <Comment
                  userName={infoComment.user}
                  voteCount={infoComment.voteCount}
                  avatarUser={infoComment.avatarUser}
                  content={infoComment.content}
                >
                  <Comment
                    userName={infoComment.user}
                    voteCount={infoComment.voteCount}
                    avatarUser={infoComment.avatarUser}
                    content={infoComment.content}
                  ></Comment>
                </Comment>
              </Comment>
              <Comment
                userName={infoComment.user}
                voteCount={infoComment.voteCount}
                avatarUser={infoComment.avatarUser}
                content={infoComment.content}
              ></Comment>
            </div>
          </CardFooter>
        </Card>
      </main>

      {/* Информация о топике*/}
      <section className="hidden items-center xl:flex">
        <Card className="w-80 self-start">
          <CardHeader>
            <div className="mr-auto inline-flex items-center gap-2">
              <Avatar
                radius="full"
                size="sm"
                src="https://b.thumbs.redditmedia.com/8RJ1zsSxLbTrSrRAhziwMynfkWVcuFNMXPsLqtGct1o.png"
              />
              <h1>Node.js</h1>
            </div>
            <Button radius="full" className="self-end" color="primary">
              Join
            </Button>
          </CardHeader>
          <CardBody className="overflow-hidden p-3 py-0 text-small text-default-400">
            <p className="text-left">
              A community for discussing anything related to the React UI
              framework and its ecosystem. Join the Reactiflux Discord
              (reactiflux.com) for additional React discussion and help.
            </p>
          </CardBody>
          <CardFooter className="flex flex-col items-start text-small text-default-400">
            <span className="text-foreground">367K</span>
            <span>Members</span>
          </CardFooter>
        </Card>
      </section>
    </div>
  );
};

export default PostPage;
