'use client';

import { FC } from 'react';
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

const CreatePage: FC = () => {
  const methods = useForm<PostSchemaType>({
    resolver: zodResolver(PostSchema),
  });

  const createPost = methods.handleSubmit(async data => {
    console.log(data);
  });

  return (
    <div>
      <FormProvider {...methods}>
        <form
          className="m-0 flex justify-center gap-5 sm:m-5"
          onSubmit={createPost}
          noValidate
        >
          {/* overflow-auto - нужен для работы скроллинга в MDXEditor. p-10 -m-10 box-content - для починки теней. */}
          <main className="box-content flex w-full max-w-page justify-center lg:-m-10 lg:overflow-auto lg:p-10">
            <Card className="relative w-full rounded-none p-1 sm:rounded-medium">
              <CardHeader>
                <h1 className="mr-auto">Create a post</h1>
                <Tooltip content="Mark as Not Safe For Work">
                  <TagSwitch name="isNSFW" text="NSFW" />
                </Tooltip>
              </CardHeader>
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
              <CardFooter>
                <div className="ml-auto flex gap-2">
                  <Button type="button" radius="full" content="Public">
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    radius="full"
                    color="primary"
                    content="Public"
                  >
                    Public
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </main>
          <section className="hidden w-80 shrink-0 flex-col gap-5 lg:flex">
            <SearchTopic />
          </section>
        </form>
      </FormProvider>
    </div>
  );
};

export default CreatePage;
