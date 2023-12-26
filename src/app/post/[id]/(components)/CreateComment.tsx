'use client';

import { useRouter } from 'next/navigation';
import { FC, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { commentController } from 'src/api';
import { MDXEditor } from 'src/components/MDXEditor';
import { useAuth } from 'src/context/Auth';
import { IPost } from 'src/interface';
import { isNull } from 'src/utils';

const CreateComment: FC<{ post: IPost }> = ({ post }) => {
  const methods = useForm();
  const { user } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [rerendMDX, setRerendMDX] = useState<boolean>(false);

  const handleSubmit = methods.handleSubmit(data => {
    if (isNull(data.comment)) return;
    if (!user) return;
    setIsLoading(true);

    console.log(data);

    commentController
      .create({
        userId: user.uid,
        postId: post.id,
        content: data.comment,
      })
      .then(() => {
        setIsLoading(false);
        setRerendMDX(true);
        router.refresh();
      });
  });

  useEffect(() => {
    setRerendMDX(false);
  }, [rerendMDX]);

  return (
    <FormProvider {...methods}>
      <form name="createComment" noValidate onSubmit={handleSubmit}>
        {!rerendMDX && (
          <MDXEditor
            withHideAnim={true}
            withPublicButton={true}
            name="comment"
            markdown=""
            placeholder="Add a comment..."
            isLoading={isLoading}
          />
        )}
      </form>
    </FormProvider>
  );
};

export default CreateComment;
