'use client';

import { Button } from '@nextui-org/react';
import { FC } from 'react';
import { useEditContext } from 'src/context/Edit';

const SubmitEdit: FC = () => {
  const { isEdit, setIsEdit } = useEditContext();

  return (
    <>
      {isEdit ? (
        <div className="ml-auto flex flex-row gap-2">
          <Button
            onClick={() => setIsEdit(false)}
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
            Update
          </Button>
        </div>
      ) : null}
    </>
  );
};

export default SubmitEdit;
