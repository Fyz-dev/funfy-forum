'use client';

import { Input } from '@nextui-org/input';
import { Button } from '@nextui-org/button';
import { FC } from 'react';
import { Search as IconSearch } from 'src/assets/icons';
import { useDisclosure } from '@nextui-org/modal';
import { ModalSearch } from 'src/components/ModalSearch';

const TriggerSearch: FC = () => {
  const { onOpen, isOpen, onOpenChange, onClose } = useDisclosure();

  return (
    <>
      <div
        className="relative flex w-full max-w-xs max-sm:hidden sm:min-w-[240px]"
        onClick={onOpen}
      >
        <Input
          autoFocus={false}
          endContent={
            <IconSearch className="transition group-hover:scale-110" />
          }
          variant="faded"
          placeholder="Find topic, or post"
          size="sm"
          radius="full"
          fullWidth
          className="w-full"
          classNames={{
            mainWrapper: 'min-h-unit-10',
            inputWrapper: 'max-h-unit-10',
            input: 'select-none pointer-events-none',
          }}
          disabled
        />
      </div>
      <Button
        disableRipple
        isIconOnly
        variant="light"
        size="md"
        className="group sm:hidden"
        onClick={onOpen}
      >
        <IconSearch className="h-5 w-5 transition group-hover:scale-110" />
      </Button>
      <ModalSearch
        onClose={onClose}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
    </>
  );
};

export default TriggerSearch;
