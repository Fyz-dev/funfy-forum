'use client';

import { Card, CardBody, CardHeader, CardFooter } from '@nextui-org/card';
import { Button } from '@nextui-org/button';
import { DropzoneAvatar } from 'src/components/DropzoneAvatar';
import { useAuth } from 'src/context/Auth';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { Textarea } from 'src/components/ui/Textarea';
import { Input } from 'src/components/ui/Input';
import { ProfileSchema, ProfileSchemaType } from 'src/validations/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRef, useState } from 'react';
import { updateUser } from 'src/api/supabase';
import { isSupabaseImg, updateImage } from 'src/utils/supabase';
import { useRouter } from 'next/navigation';
import { toUser } from 'src/utils/paths';
import { getRandom } from 'src/utils';
import toast from 'react-hot-toast';
import Link from 'next/link';

const Profile = () => {
  const { user, updateData } = useAuth();
  // const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const methods = useForm<ProfileSchemaType>({
    resolver: zodResolver(ProfileSchema),
  });
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const avatarChange = useRef<boolean>(false);

  if (!user) return null;

  const handleSubmit = methods.handleSubmit(async data => {
    setIsLoading(true);
    let photoURL: string | undefined = user.photoURL;

    if (avatarChange.current) {
      photoURL = await updateImage(
        user.uid,
        'user-avatars',
        data.avatar as File | undefined,
        isSupabaseImg(user.photoURL || '') ? user.photoURL : undefined,
      );
    }

    toast
      .promise(
        updateUser({
          uid: user.uid,
          name: data.name,
          description: data.description,
          photoURL: photoURL,
        }),
        {
          loading: 'Saving...',
          success: 'Profile updated!',
          error: 'Profile not updated.',
        },
      )
      .then(() => {
        setIsLoading(false);
        router.push(toUser(user.uid));
        router.refresh();
        updateData();
      });
  });

  return (
    <div className="flex justify-center sm:m-5">
      <main className="flex w-full max-w-page flex-col items-start gap-3 sm:gap-5">
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit}
            className="w-full max-sm:h-[100vh]"
            noValidate
          >
            <Card className="h-full max-sm:rounded-none max-sm:bg-transparent">
              <CardHeader>
                <h1>Setting Profile</h1>
              </CardHeader>
              <CardBody className="gap-5 [&>*]:flex [&>*]:flex-col  [&>*]:gap-1">
                <div>
                  <h3>Name</h3>
                  <Input
                    name="name"
                    defaultValue={user.name}
                    variant="bordered"
                    placeholder="Name"
                  />
                </div>
                <div>
                  <div>
                    <h3>About</h3>
                    <p className="text-tiny text-default-400">
                      A brief description of yourself shown on your profile.
                    </p>
                  </div>
                  <Textarea
                    name="description"
                    defaultValue={user.userDetails.description}
                    maxRows={10}
                    variant="bordered"
                    placeholder="About (optional)"
                  />
                </div>
                {/* <div>
                  <div>
                    <h3>Social links (7 max)</h3>
                    <p className="text-tiny text-default-400">
                      People who visit your profile will see your social links.
                    </p>
                  </div>
                  <div className="flex">
                    <Button radius="full" onClick={onOpen}>
                      <Plus />
                      Add social link
                    </Button>
                  </div>
                </div> */}
                <div>
                  <h3>Avatar</h3>
                  <Controller
                    control={methods.control}
                    name="avatar"
                    render={({ field: { onChange } }) => {
                      return (
                        <DropzoneAvatar
                          defaultUrlImage={
                            user.photoURL && user.photoURL + '?c=' + getRandom()
                          }
                          textDragNoActive="Drag and drop avatar, or click to select image"
                          onChange={file => {
                            onChange(file);
                            avatarChange.current = true;
                          }}
                        />
                      );
                    }}
                  />
                </div>
              </CardBody>
              <CardFooter>
                <Card className="w-full p-0 shadow-medium sm:shadow-none">
                  <div className="fixed bottom-0 left-0 z-10 w-full sm:relative sm:flex sm:p-0">
                    <Card className="flex w-full flex-row items-start gap-2 overflow-visible max-sm:flex-col max-sm:rounded-b-none max-sm:rounded-t-3xl max-sm:p-3 max-sm:py-8 sm:shadow-none">
                      <div className="flex w-full gap-2">
                        <Button
                          as={Link}
                          href={toUser(user.uid)}
                          type="button"
                          radius="full"
                          className="ml-auto max-sm:hidden"
                        >
                          Cancel
                        </Button>
                        <Button
                          className="max-sm:w-full"
                          radius="full"
                          color="primary"
                          type="submit"
                          isLoading={isLoading}
                        >
                          Save
                        </Button>
                      </div>
                    </Card>
                  </div>
                </Card>
              </CardFooter>
            </Card>
          </form>
        </FormProvider>
        {/* <ModalSocialLinks isOpen={isOpen} onOpenChange={onOpenChange} /> */}
      </main>
    </div>
  );
};

export default Profile;
