import { FC, useEffect, useState } from 'react';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/modal';
import Image from 'next/image';
import { ArrowLeft } from 'src/assets/icons';
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import { socialLinks } from 'src/utils';

const ModalSocialLinks: FC<
  Pick<ReturnType<typeof useDisclosure>, 'isOpen' | 'onOpenChange'>
> = ({ isOpen, onOpenChange }) => {
  const [currentSocial, setCurrentSocial] =
    useState<(typeof socialLinks)[number]>();

  useEffect(() => {
    if (!isOpen) setCurrentSocial(undefined);
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {onClose => (
          <>
            {currentSocial ? (
              <>
                <ModalHeader className="flex justify-center text-center">
                  <Button
                    size="sm"
                    radius="full"
                    variant="light"
                    className="absolute left-1 top-1"
                    isIconOnly
                    onClick={() => {
                      setCurrentSocial(undefined);
                    }}
                  >
                    <ArrowLeft className="h-[1em] w-[1em] text-foreground-500" />
                  </Button>
                  Add Social Link
                </ModalHeader>
                <ModalBody>
                  <Button
                    key={currentSocial.key}
                    className="mr-auto max-w-min text-black"
                    style={{ backgroundColor: currentSocial.color }}
                    radius="full"
                    startContent={
                      <Image
                        width={16}
                        height={16}
                        src={currentSocial.icon}
                        alt={currentSocial.key}
                      />
                    }
                    disabled
                  >
                    {currentSocial.key}
                  </Button>
                  <Input variant="bordered" placeholder="Display text" />
                  <Input variant="bordered" placeholder="https://discord.com" />
                </ModalBody>
                <ModalFooter>
                  <Button radius="full" color="primary" onPress={onClose}>
                    Save
                  </Button>
                </ModalFooter>
              </>
            ) : (
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
                      onClick={() => {
                        setCurrentSocial(item);
                      }}
                    >
                      {item.key}
                    </Button>
                  ))}
                </ModalBody>
              </>
            )}
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ModalSocialLinks;
