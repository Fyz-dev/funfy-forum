'use client';

import { Button } from '@nextui-org/react';
import { FC } from 'react';
import { useEditContext } from 'src/context/Edit';

const SubmitEdit: FC = () => {
  const { isEdit, setIsEdit, isLoading } = useEditContext();

  return (
    <>
      {isEdit ? (
        <div className="ml-auto flex flex-row gap-2">
          <Button onClick={() => setIsEdit(false)} type="button" radius="full">
            Cancel
          </Button>
          <Button
            type="submit"
            color="primary"
            radius="full"
            isLoading={isLoading}
          >
            Update
          </Button>
        </div>
      ) : null}
    </>
  );
};

export default SubmitEdit;
