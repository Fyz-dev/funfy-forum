'use client';

import { FC, useState } from 'react';
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import { Input } from 'src/components/ui/Input';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { TopicSchema, TopicSchemaType } from 'src/validations/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from 'src/context/Auth';
import { Textarea } from 'src/components/ui/Textarea';
import { Button } from '@nextui-org/react';
import Link from 'next/link';
import { DropzoneAvatar } from 'src/components/DropzoneAvatar';
import { createBrowserClient } from 'src/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { createTopic } from 'src/api/supabase';

const CreatePage: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const methods = useForm<TopicSchemaType>({
    resolver: zodResolver(TopicSchema),
  });
  const { user } = useAuth();
  const router = useRouter();

  const handleSubmit = methods.handleSubmit(async data => {
    if (!user) return;

    setIsLoading(true);
    let photoURL = '';

    if (data.avatar) {
      const avatar = data.avatar as File;

      const { data: res } = await createBrowserClient()
        .storage.from('topic-avatars')
        .upload(`${new Date().getTime()}_${Math.random()}`, avatar);

      if (res)
        photoURL = createBrowserClient()
          .storage.from('topic-avatars')
          .getPublicUrl(res.path).data.publicUrl;
    }

    createTopic({ userID: user.uid, photoURL: photoURL, name: data.name }).then(
      () => {
        setIsLoading(false);
        router.push('/');
      },
    );
  });

  return (
    <FormProvider {...methods}>
      <form
        name="createTopic"
        onSubmit={handleSubmit}
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
              <Controller
                control={methods.control}
                name="avatar"
                render={({ field: { onChange } }) => {
                  return (
                    <DropzoneAvatar
                      textDragNoActive="Drag and drop avatar topic, or click to select image"
                      onChange={file => {
                        onChange(file);
                      }}
                    />
                  );
                }}
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
                    isLoading={isLoading}
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
