'use client';

import { Card, CardBody, CardHeader, CardFooter } from '@nextui-org/card';
import { Button } from '@nextui-org/button';
import { Plus } from 'src/assets/icons';
import { DropzoneAvatar } from 'src/components/DropzoneAvatar';
import { useAuth } from 'src/context/Auth';
import { useDisclosure } from '@nextui-org/modal';
import { ModalSocialLinks } from 'src/components/ModalSocialLinks';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { Textarea } from 'src/components/ui/Textarea';
import { Input } from 'src/components/ui/Input';
import { ProfileSchema, ProfileSchemaType } from 'src/validations/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRef } from 'react';

const Profile = () => {
  const { user } = useAuth();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const methods = useForm<ProfileSchemaType>({
    resolver: zodResolver(ProfileSchema),
  });
  const avatarChange = useRef<boolean>(false);

  if (!user) return null;

  const handleSubmit = methods.handleSubmit(async data => {
    console.log(data);
  });

  return (
    <div className="flex justify-center sm:m-5">
      <main className="flex w-full max-w-page flex-col items-start gap-3 sm:gap-5">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit} className="w-full" noValidate>
            <Card className="max-sm:rounded-none max-sm:bg-transparent">
              <CardHeader>
                <h1>Setting Profile</h1>
              </CardHeader>
              <CardBody className="gap-5 [&>*]:flex [&>*]:flex-col [&>*]:gap-1">
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
                    maxRows={30}
                    variant="bordered"
                    placeholder="About (optional)"
                  />
                </div>
                <div>
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
                </div>
                <div>
                  <h3>Avatar</h3>
                  <Controller
                    control={methods.control}
                    name="avatar"
                    render={({ field: { onChange } }) => {
                      return (
                        <DropzoneAvatar
                          defaultUrlImage={user.photoURL}
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
                <Button
                  className="max-sm:w-full sm:ml-auto"
                  radius="full"
                  color="primary"
                  type="submit"
                >
                  Save
                </Button>
              </CardFooter>
            </Card>
          </form>
        </FormProvider>
        <ModalSocialLinks isOpen={isOpen} onOpenChange={onOpenChange} />
      </main>
    </div>
  );
};

export default Profile;
