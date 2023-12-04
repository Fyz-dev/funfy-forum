'use client';

import { FC } from 'react';
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import { Input } from 'src/components/ui/Input';
import { FormProvider, useForm } from 'react-hook-form';
import { TopicSchema, TopicSchemaType } from 'src/validations/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from 'src/context/Auth';
import { Textarea } from 'src/components/ui/Textarea';
import { Button } from '@nextui-org/react';
import Link from 'next/link';

const CreatePage: FC = () => {
  const methods = useForm<TopicSchemaType>({
    resolver: zodResolver(TopicSchema),
  });
  const { user } = useAuth();

  const createTopic = methods.handleSubmit(async data => {
    if (!user) return;

    console.log(data);
  });

  return (
    <FormProvider {...methods}>
      <form
        name="createTopic"
        onSubmit={createTopic}
        noValidate
        className="m-0 flex justify-center sm:m-5"
      >
        <main className="flex w-full max-w-page justify-center">
          <Card className="w-full max-sm:border-none max-sm:bg-transparent max-sm:shadow-none">
            <CardHeader>
              <h1>Create a Topic</h1>
            </CardHeader>
            <CardBody className="flex gap-3">
              <Input
                id="name"
                name="name"
                variant="bordered"
                placeholder="Add a name..."
                isRequired={true}
              />
              <Textarea
                name="description"
                variant="bordered"
                placeholder="Add a description... (optional)"
                maxRows={10}
              />
            </CardBody>
            <CardFooter>
              <div className="fixed bottom-0 left-0 z-10 ml-auto gap-2 max-sm:w-full sm:relative sm:flex sm:p-0">
                <Card className="flex w-full flex-row gap-2 overflow-visible max-sm:rounded-b-none max-sm:rounded-t-3xl max-sm:p-3 max-sm:py-8 sm:shadow-none">
                  <Button
                    as={Link}
                    href="/"
                    type="button"
                    radius="full"
                    className="max-sm:hidden"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    color="primary"
                    radius="full"
                    className="max-sm:w-full"
                  >
                    Create
                  </Button>
                </Card>
              </div>
            </CardFooter>
          </Card>
        </main>
      </form>
    </FormProvider>
  );
};

export default CreatePage;
