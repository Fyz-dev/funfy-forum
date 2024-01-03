'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';
import {
  DefaultValues,
  FieldValues,
  FormProvider,
  UseFormReturn,
  useForm,
} from 'react-hook-form';
import { PostSchema, PostSchemaType } from 'src/validations/schemas';
import { ZodType } from 'zod';

type EditContextPops = {
  isEdit: boolean;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
};

const EditContext = createContext<EditContextPops>({} as EditContextPops);

export const EditContextProvider = <T extends FieldValues>({
  children,
  schemaValidate,
  onSubmit,
  defaultValues,
}: {
  children?: ReactNode;
  schemaValidate: ZodType<T>;
  onSubmit: (data: T) => void;
  defaultValues?: DefaultValues<T>;
}) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const methods = useForm<T>({
    resolver: zodResolver(schemaValidate),
    defaultValues: defaultValues,
  });

  const handleSubmit = methods.handleSubmit(async data => {
    onSubmit(data);
  });

  return (
    <EditContext.Provider
      value={{
        isEdit: isEdit,
        setIsEdit: setIsEdit,
      }}
    >
      <>
        {isEdit ? (
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit} noValidate>
              {children}
            </form>
          </FormProvider>
        ) : (
          children
        )}
      </>
    </EditContext.Provider>
  );
};

export const EditPostContextProvider: FC<{
  children?: ReactNode;
  defaultValues: Pick<PostSchemaType, 'topicID' | 'isNSFW'>;
}> = ({ children, defaultValues }) => {
  return (
    <EditContextProvider
      onSubmit={data => {
        console.log(data);
      }}
      schemaValidate={PostSchema}
      defaultValues={defaultValues}
    >
      <>{children}</>
    </EditContextProvider>
  );
};

export const useEditContext = () => useContext(EditContext);
