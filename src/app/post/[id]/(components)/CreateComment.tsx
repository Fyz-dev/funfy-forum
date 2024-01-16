'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { createComment } from 'src/api/supabase';
import { MDXEditor } from 'src/components/MDXEditor';
import { useAuth } from 'src/context/Auth';
import { useCommentsTreeContext } from 'src/context/CommentsTreeContext';
import { useModalAuthContext } from 'src/context/ModalAuth';
import { AuthMode } from 'src/enums';
import { IPost } from 'src/interface';
import { isNull } from 'src/utils';
import {
  CommentSchemaCreate,
  CommentSchemaCreateType,
} from 'src/validations/schemas';

const CreateComment: FC<{ post: IPost }> = ({ post }) => {
  const methods = useForm<CommentSchemaCreateType>({
    resolver: zodResolver(CommentSchemaCreate),
  });
  const { user } = useAuth();
  const { onOpen } = useModalAuthContext();
  const {
    swr: { mutate, data: comments },
  } = useCommentsTreeContext();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [rerendMDX, setRerendMDX] = useState<boolean>(false);

  const handleSubmit = methods.handleSubmit(data => {
    if (isNull(data.comment)) {
      methods.setError('comment', {
        type: 'custom',
        message: 'Field cannot be empty',
      });
      return;
    }
    if (!user) return;
    setIsLoading(true);

    toast
      .promise(
        createComment({
          userId: user.uid,
          postId: post.id,
          content: data.comment,
        }),
        {
          loading: 'Saving...',
          success: 'Comment saved!',
          error: 'Comment not saved.',
        },
      )
      .then(() => {
        setIsLoading(false);
        setRerendMDX(true);

        if (comments?.flat().length === 0) router.refresh();
        mutate();
      });
  });

  useEffect(() => {
    setRerendMDX(false);
  }, [rerendMDX]);

  return (
    <FormProvider {...methods}>
      <form
        onClick={() => {
          if (!user) {
            toast.error('You need to log in!');
            onOpen(AuthMode.LOGIN);
          }
        }}
        name="createComment"
        noValidate
        onSubmit={handleSubmit}
      >
        <div className={cn(!user && 'pointer-events-none select-none')}>
          {!rerendMDX && (
            <MDXEditor
              withHideAnim={true}
              publicButton="Comment"
              name="comment"
              markdown=""
              placeholder="Add a comment..."
              isLoading={isLoading}
            />
          )}
        </div>
      </form>
    </FormProvider>
  );
};

export default CreateComment;
