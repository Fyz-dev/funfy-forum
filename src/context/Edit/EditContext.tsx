'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
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
import { updatePost } from 'src/api/supabase';
import { IPost } from 'src/interface';
import { PostSchema, PostSchemaType } from 'src/validations/schemas';
import { ZodType } from 'zod';

type EditContextPops = {
  isEdit: boolean;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
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
  onSubmit: (data: T) => Promise<void>;
  defaultValues?: DefaultValues<T>;
}) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const methods = useForm<T>({
    resolver: zodResolver(schemaValidate),
    defaultValues: defaultValues,
  });
  const router = useRouter();

  const handleSubmit = methods.handleSubmit(async data => {
    setIsLoading(true);
    onSubmit(data).then(() => {
      setIsLoading(false);
      router.refresh();
      setIsEdit(false);
    });
  });

  return (
    <EditContext.Provider
      value={{
        isEdit: isEdit,
        setIsEdit: setIsEdit,
        isLoading: isLoading,
        setIsLoading: setIsLoading,
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

export const useEditContext = () => useContext(EditContext);

export const EditPostContextProvider: FC<{
  postId: IPost['id'];
  children?: ReactNode;
  defaultValues: Pick<PostSchemaType, 'topicID' | 'isNSFW'>;
}> = ({ postId, children, defaultValues }) => {
  return (
    <EditContextProvider<PostSchemaType>
      defaultValues={defaultValues}
      schemaValidate={PostSchema}
      onSubmit={async data => {
        await updatePost({
          id: postId,
          title: data.title,
          content: data.content,
        });
      }}
    >
      <>{children}</>
    </EditContextProvider>
  );
};
