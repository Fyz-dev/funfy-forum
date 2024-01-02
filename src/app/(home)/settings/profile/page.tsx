'use client';

import { Card, CardBody, CardHeader, CardFooter } from '@nextui-org/card';
import { Input, Textarea } from '@nextui-org/input';
import { Button } from '@nextui-org/button';
import { Plus } from 'src/assets/icons';
import { DropzoneAvatar } from 'src/components/DropzoneAvatar';
import { useAuth } from 'src/context/Auth';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/modal';
import Image from 'next/image';
import { socialLinks } from 'src/utils';

const Profile = () => {
  const { user } = useAuth();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  if (!user) return null;

  return (
    <div className="flex justify-center sm:m-5">
      <main className="flex w-full max-w-page flex-col items-start gap-3 sm:gap-5">
        <Card className="w-full max-sm:rounded-none max-sm:bg-transparent">
          <CardHeader>
            <h1>Setting Profile</h1>
          </CardHeader>
          <CardBody className="gap-5 [&>*]:flex [&>*]:flex-col [&>*]:gap-1">
            <div>
              <h3>Name</h3>
              <Input
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
              <DropzoneAvatar
                defaultUrlImage={user.photoURL}
                textDragNoActive="Drag and drop avatar, or click to select image"
              />
            </div>
          </CardBody>
          <CardFooter>
            <Button
              className="max-sm:w-full sm:ml-auto"
              radius="full"
              color="primary"
            >
              Save
            </Button>
          </CardFooter>
        </Card>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {onClose => (
              <>
                <ModalHeader className="flex justify-center text-center">
                  Add Social Link
                </ModalHeader>
                <ModalBody className="flex flex-row flex-wrap justify-center">
                  {socialLinks.map(item => (
                    <Button
                      key={item.key}
                      className={`max-w-min text-black`}
                      style={{ backgroundColor: item.color }}
                      radius="full"
                      startContent={
                        <Image
                          width={16}
                          height={16}
                          src={item.icon}
                          alt={item.key}
                        />
                      }
                    >
                      {item.key}
                    </Button>
                  ))}
                </ModalBody>
                {/* <ModalFooter>
                  <Button radius="full" color="primary" onPress={onClose}>
                    Save
                  </Button>
                </ModalFooter> */}
              </>
            )}
          </ModalContent>
        </Modal>
      </main>
    </div>
  );
};

export default Profile;
