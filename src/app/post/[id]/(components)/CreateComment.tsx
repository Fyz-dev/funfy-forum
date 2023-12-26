'use client';

import { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { MDXEditor } from 'src/components/MDXEditor';
import { useAuth } from 'src/context/Auth';

const CreateComment: FC = () => {
  const methods = useForm();
  const { user } = useAuth();

  const handleCreate = methods.handleSubmit(async data => {
    if (!user) return;

    console.log(data);
  });

  return (
    <FormProvider {...methods}>
      <form name="createComment" noValidate onSubmit={handleCreate}>
        <MDXEditor
          withHideAnim={true}
          withPublicButton={true}
          name="comment"
          markdown=""
          placeholder="Add a comment..."
        />
      </form>
    </FormProvider>
  );
};

export default CreateComment;
