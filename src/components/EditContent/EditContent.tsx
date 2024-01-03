'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { Dispatch, ReactNode, SetStateAction } from 'react';
import {
  DefaultValues,
  FieldValues,
  FormProvider,
  useForm,
} from 'react-hook-form';
import { useEditContext } from 'src/context/Edit';
import { ZodType } from 'zod';

const EditContent = <T extends FieldValues>({
  children,
  forEdit,
  schemaValidate,
  onSubmit,
  defaultValues,
  setIsLoading,
}: {
  children: ReactNode;
  forEdit: ReactNode;
  schemaValidate: ZodType<T>;
  onSubmit: (data: T) => Promise<void>;
  defaultValues?: DefaultValues<T>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}) => {
  const { isEdit, setIsEdit } = useEditContext();
  const methods = useForm<T>({
    resolver: zodResolver(schemaValidate),
    defaultValues: defaultValues,
  });
  const router = useRouter();

  const handleSubmit = methods.handleSubmit(async data => {
    setIsLoading(true);
    onSubmit(data).then(() => {
      router.refresh();
      setIsEdit(false);
      setIsLoading(false);
    });
  });

  return (
    <>
      {isEdit ? (
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit} noValidate>
            {forEdit}
          </form>
        </FormProvider>
      ) : (
        children
      )}
    </>
  );
};

export default EditContent;
