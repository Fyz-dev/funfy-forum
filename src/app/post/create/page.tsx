'use client';

import { FC, useState } from 'react';
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import { Button } from '@nextui-org/button';
import { Input } from 'src/components/ui/Input';
import { MDXEditor } from 'src/components/MDXEditor';
import { TagSwitch } from 'src/components/ui/TagSwitch';
import { SearchTopic } from 'src/components/SearchTopic';
import { Tooltip } from '@nextui-org/tooltip';
import { FormProvider, useForm } from 'react-hook-form';
import { PostSchema, PostSchemaType } from 'src/validations/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import postController from 'src/api/controller/PostController';
import { useAuth } from 'src/context/Auth';
import { Timestamp } from 'firebase/firestore';
import Link from 'next/link';
import { ITopic } from 'src/interface';
import TopicCard from 'src/components/TopicCard/TopicCard';
import { card } from '@nextui-org/react';

const ButtonPublic = () => {
  return (
    <>
      <Button
        className="h-14 w-28 max-[350px]:w-full lg:h-unit-10 lg:w-unit-20"
        type="submit"
        radius="full"
        color="primary"
        content="Public"
      >
        Public
      </Button>
    </>
  );
};

const CreatePage: FC = () => {
  const [topic, setTopic] = useState<ITopic | undefined>(undefined);

  const methods = useForm<PostSchemaType>({
    resolver: zodResolver(PostSchema),
  });
  const { user } = useAuth();

  const createPost = methods.handleSubmit(async data => {
    if (!user) return;

    postController.create({
      userID: user.uid,
      ...data,
      timestamp: {
        createdAt: Timestamp.now(),
        updatedAt: null,
      },
    });
  });

  return (
    <div>
      <FormProvider {...methods}>
        <form
          name="createPost"
          onSubmit={createPost}
          noValidate
          className="m-0 flex justify-center max-sm:h-screen sm:m-5"
        >
          <div className="flex w-full max-w-[1364px] flex-col justify-start gap-0 sm:gap-2 lg:gap-5">
            <Card className="min-h-[56px] w-full rounded-none shadow-none max-sm:bg-transparent sm:rounded-medium sm:shadow-medium">
              <CardHeader>
                <h1 className="mr-auto">Create a post</h1>
                <Tooltip content="Mark as Not Safe For Work">
                  <TagSwitch name="isNSFW" text="NSFW" />
                </Tooltip>
              </CardHeader>
            </Card>
            <div className="flex w-full flex-col justify-center max-lg:pb-28 sm:gap-5 lg:flex-row">
              {/* overflow-auto - нужен для работы скроллинга в MDXEditor. p-10 -m-10 box-content - для починки теней. */}
              <main className="box-content flex w-full max-w-page justify-center lg:-m-10 lg:overflow-auto lg:p-10">
                <Card className="relative w-full rounded-none shadow-none max-sm:bg-transparent sm:rounded-medium sm:shadow-medium">
                  <CardBody className="flex gap-3 ">
                    <Input
                      id="title"
                      name="title"
                      variant="bordered"
                      placeholder="Add a title..."
                    />
                    <MDXEditor
                      name="content"
                      diffMarkdown=""
                      markdown=""
                      placeholder="Add a desription..."
                    />
                  </CardBody>
                  <CardFooter className="hidden lg:flex">
                    <div className="ml-auto flex gap-2">
                      <Button
                        as={Link}
                        href="/"
                        type="button"
                        radius="full"
                        content="Public"
                        className="hidden lg:flex"
                      >
                        Cancel
                      </Button>
                      <ButtonPublic />
                    </div>
                  </CardFooter>
                </Card>
              </main>
              <section className="flex w-full shrink-0 flex-col gap-5 lg:w-80">
                <div className="fixed bottom-0 left-0 z-50 w-full sm:p-5 lg:relative lg:flex lg:p-0">
                  <Card className="flex w-full flex-row items-start gap-2 overflow-visible p-4 max-sm:rounded-b-none max-sm:rounded-t-3xl max-[350px]:flex-col lg:bg-transparent lg:p-0 lg:shadow-none ">
                    <SearchTopic
                      classNames={{
                        input:
                          'max-lg:rounded-full max-lg:shadow-none px-unit-5 lg:px-unit-4',
                      }}
                      setTopic={setTopic}
                    />
                    <div className="flex justify-center gap-2 max-[350px]:w-full lg:hidden">
                      <ButtonPublic />
                    </div>
                  </Card>
                </div>
                {topic ? (
                  <TopicCard
                    classNames={{
                      card: 'w-full max-lg:hidden',
                    }}
                    topic={topic}
                  />
                ) : (
                  ''
                )}
              </section>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default CreatePage;
