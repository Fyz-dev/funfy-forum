'use client';

import { FC, ReactNode } from 'react';
import { useEditContext } from 'src/context/Edit';

const EditContent: FC<{ children: ReactNode; forEdit: ReactNode }> = ({
  children,
  forEdit,
}) => {
  const { isEdit } = useEditContext();
  return <>{isEdit ? forEdit : children}</>;
};

export default EditContent;
