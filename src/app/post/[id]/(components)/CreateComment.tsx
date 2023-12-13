'use client';

import { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { MDXEditor } from 'src/components/MDXEditor';

const CreateComment: FC = () => {
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <MDXEditor name="comment" markdown="" placeholder="Add a comment..." />
    </FormProvider>
  );
};

export default CreateComment;
