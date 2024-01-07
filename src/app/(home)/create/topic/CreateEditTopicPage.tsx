'use client';

import { FC, useRef, useState } from 'react';
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
import { useRouter } from 'next/navigation';
import { createTopic, updateTopic } from 'src/api/supabase';
import { ITopic } from 'src/interface';
import { getPublicUrl, updateImage, uploadImage } from 'src/utils/supabase';
import { toTopic } from 'src/utils/paths';
import { getRandom } from 'src/utils';
import { createBrowserClient } from 'src/utils/supabase/client';

// Page for creating or editing a topic depending on the editTopicData variable
const CreateEditTopicPage: FC<{ editTopicData?: ITopic }> = ({
  editTopicData,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const avatarChange = useRef<boolean>(false);

  const methods = useForm<TopicSchemaType>({
    resolver: zodResolver(TopicSchema),
  });
  const { user } = useAuth();
  const router = useRouter();

  const handlerCreateTopic = async (userId: string, data: TopicSchemaType) => {
    let photoURL = '';

    if (data.avatar) {
      const avatar = data.avatar as File;

      const { data: res } = await uploadImage(
        'topic-avatars',
        getRandom(),
        avatar,
      );

      if (res) photoURL = getPublicUrl('topic-avatars', res.path);
    }

    await createTopic({
      userID: userId,
      photoURL: photoURL,
      name: data.name,
      description: data.description,
    });
  };

  const handlerEditTopic = async (
    editTopicData: ITopic,
    data: TopicSchemaType,
  ) => {
    const { data: topics } = await createBrowserClient()
      .from('topics')
      .select('*')
      .eq('name', data.name)
      .neq('id', editTopicData.id);

    if (topics?.length !== 0) {
      methods.setError('name', {
        type: 'manual',
        message: 'Name is already in use.',
      });
      throw 'Name is already in use.';
    }

    let photoURL: string | undefined = editTopicData.photoURL;

    if (avatarChange.current) {
      photoURL = await updateImage(
        getRandom(),
        'topic-avatars',
        data.avatar as File | undefined,
        editTopicData.photoURL,
      );
    }

    await updateTopic({
      topicId: editTopicData.id,
      photoURL: photoURL || null,
      name: data.name,
      description: data.description,
    });
  };

  const handleSubmit = methods.handleSubmit(async data => {
    if (!user) return;
    setIsLoading(true);

    const handler = editTopicData
      ? handlerEditTopic(editTopicData, data).then(() => {
          router.push(toTopic(editTopicData.id));
          router.refresh();
        })
      : handlerCreateTopic(user.uid, data).then(() => {
          router.push('/');
          router.refresh();
        });

    handler
      .then(() => {
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
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
              <h1>{editTopicData ? 'Edit a topic' : 'Create a Topic'}</h1>
            </CardHeader>
            <CardBody className="flex gap-3">
              <Input
                id="name"
                name="name"
                variant="bordered"
                placeholder="Add a name..."
                defaultValue={editTopicData?.name}
                isRequired={true}
              />
              <Textarea
                name="description"
                variant="bordered"
                placeholder="Add a description... (optional)"
                defaultValue={editTopicData?.description}
                maxRows={10}
              />
              <Controller
                control={methods.control}
                name="avatar"
                render={({ field: { onChange } }) => {
                  return (
                    <DropzoneAvatar
                      defaultUrlImage={
                        editTopicData?.photoURL
                          ? editTopicData.photoURL + '?c=' + getRandom()
                          : undefined
                      }
                      textDragNoActive="Drag and drop avatar topic, or click to select image"
                      onChange={file => {
                        onChange(file);
                        avatarChange.current = true;
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
                    {editTopicData ? 'Save' : 'Create'}
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

export default CreateEditTopicPage;
