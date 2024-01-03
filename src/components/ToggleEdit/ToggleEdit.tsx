'use client';

import { ComponentProps, FC, ReactNode } from 'react';
import { OnlyAuthor } from '../Checker';
import { Button, ButtonProps } from '@nextui-org/button';
import { useEditContext } from 'src/context/Edit';

const ToggleEdit: FC<
  {
    children?: ReactNode;
    idAuthor: ComponentProps<typeof OnlyAuthor>['idAuthor'];
  } & Omit<ButtonProps, 'onClick'>
> = ({ children, idAuthor, ...rest }) => {
  const { isEdit, setIsEdit } = useEditContext();

  return (
    <OnlyAuthor idAuthor={idAuthor}>
      <Button
        onClick={() => {
          setIsEdit(!isEdit);
        }}
        {...rest}
      >
        {children}
      </Button>
    </OnlyAuthor>
  );
};

export default ToggleEdit;
