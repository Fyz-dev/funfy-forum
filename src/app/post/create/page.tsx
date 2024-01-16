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
import { useAuth } from 'src/context/Auth';
import Link from 'next/link';
import { ITopic } from 'src/interface';
import TopicCard from 'src/components/TopicCard/TopicCard';
import { useRouter } from 'next/navigation';
import { createPost } from 'src/api/supabase';
import toast from 'react-hot-toast';

const ButtonPublic: FC<{ isLoading: boolean }> = ({ isLoading }) => {
  return (
    <>
      <Button
        className="h-14 w-28 text-medium max-sm:h-unit-10 max-sm:w-full max-sm:text-small lg:h-unit-10 lg:w-unit-20 lg:text-small"
        type="submit"
        radius="full"
        color="primary"
        content="Public"
        isLoading={isLoading}
      >
        Public
      </Button>
    </>
  );
};

const CreatePage: FC = () => {
  const methods = useForm<PostSchemaType>({
    resolver: zodResolver(PostSchema),
  });
  const { user } = useAuth();
  const redirect = useRouter();

  const [topic, setTopic] = useState<ITopic | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = methods.handleSubmit(async data => {
    if (!user) return;
    setIsLoading(true);

    toast
      .promise(
        createPost({
          userID: user.uid,
          ...data,
        }),
        {
          loading: 'Creating a post...',
          success: 'Post created!',
          error: 'Post not created.',
        },
      )
      .then(() => {
        setIsLoading(false);
        redirect.push('/');
      });
  });

  return (
    <div>
      <FormProvider {...methods}>
        <form
          name="createPost"
          onSubmit={handleSubmit}
          noValidate
          className="m-0 flex justify-center max-lg:pb-28 max-sm:h-screen sm:m-5"
        >
          <Card className="flex w-full max-w-[1364px] flex-col justify-start gap-0 overflow-visible max-sm:rounded-none max-sm:bg-transparent max-sm:shadow-none lg:gap-5 lg:bg-transparent lg:shadow-none">
            <Card className="min-h-[56px] w-full rounded-none shadow-none max-sm:bg-transparent sm:rounded-medium lg:shadow-medium">
              <CardHeader>
                <h1 className="mr-auto">Create a post</h1>
                <Tooltip className="hidden" content="Mark as Not Safe For Work">
                  <TagSwitch name="isNSFW" text="NSFW" />
                </Tooltip>
              </CardHeader>
            </Card>
            <div className="flex w-full flex-col justify-center lg:flex-row lg:gap-5">
              {/* overflow-auto - нужен для работы скроллинга в MDXEditor. p-10 -m-10 box-content - для починки теней. */}
              <main className="box-content flex w-full max-w-page justify-center lg:-m-10 lg:overflow-auto lg:p-10">
                <Card className="relative w-full rounded-none shadow-none max-sm:mb-44 max-sm:bg-transparent sm:rounded-medium lg:shadow-medium">
                  <CardBody className="flex gap-3 overflow-hidden max-sm:shadow-none">
                    <Input
                      id="title"
                      name="title"
                      variant="bordered"
                      placeholder="Add a title..."
                      size="lg"
                      classNames={{ input: 'text-xl' }}
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
                      <ButtonPublic isLoading={isLoading} />
                    </div>
                  </CardFooter>
                </Card>
              </main>
              <section className="flex w-full shrink-0 flex-col gap-0 lg:w-96">
                <Card className="shadow-medium">
                  <div className="fixed bottom-0 left-0 z-10 w-full sm:p-5 lg:relative lg:flex lg:p-0">
                    <Card className="flex w-full flex-row items-start gap-2 overflow-visible p-3 max-sm:flex-col max-sm:rounded-b-none max-sm:rounded-t-3xl max-sm:py-8 lg:shadow-none">
                      <SearchTopic
                        classNames={{
                          input: 'max-lg:rounded-full w-full shadow-none',
                        }}
                        setTopic={setTopic}
                        topic={topic}
                      />
                      <div className="flex justify-center gap-2 max-sm:w-full lg:hidden">
                        <ButtonPublic isLoading={isLoading} />
                      </div>
                    </Card>
                  </div>
                  {topic && (
                    <TopicCard
                      classNames={{
                        cardHeader: 'pt-0',
                        card: 'w-full max-lg:hidden shadow-none',
                      }}
                      topic={topic}
                    />
                  )}
                </Card>
              </section>
            </div>
          </Card>
        </form>
      </FormProvider>
    </div>
  );
};

export default CreatePage;
