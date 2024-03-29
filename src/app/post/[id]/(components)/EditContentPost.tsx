'use client';

import { Button } from '@nextui-org/button';
import { useRouter } from 'next/navigation';
import { FC, ReactNode, useState } from 'react';
import toast from 'react-hot-toast';
import { updatePost } from 'src/api/supabase';
import { EditContent } from 'src/components/EditContent';
import { MDXEditor } from 'src/components/MDXEditor';
import { Input } from 'src/components/ui/Input';
import { useEditContext } from 'src/context/Edit';
import { IPost } from 'src/interface';
import { PostSchema, PostSchemaType } from 'src/validations/schemas';

const EditContentPost: FC<{
  children?: ReactNode;
  post: IPost;
  defaultValues: Pick<PostSchemaType, 'topicID' | 'isNSFW'>;
}> = ({ children, post, defaultValues }) => {
  const { setIsEdit } = useEditContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  return (
    <EditContent<PostSchemaType>
      onSubmit={async data => {
        await toast.promise(
          updatePost({
            id: post.id,
            title: data.title,
            content: data.content,
          }),
          {
            loading: 'Editing a post...',
            success: 'Post updated!',
            error: 'Post not updated.',
          },
        );
        router.refresh();
      }}
      schemaValidate={PostSchema}
      setIsLoading={setIsLoading}
      defaultValues={defaultValues}
      forEdit={
        <div className="flex flex-col gap-2">
          <Input
            name="title"
            variant="bordered"
            placeholder="Title"
            defaultValue={post.title}
            classNames={{ input: '!text-2xl' }}
          />
          <MDXEditor
            name="content"
            markdown={post.content || ''}
            diffMarkdown={post.content || ''}
          />

          {/* ---- Update edit ---- */}
          <div className="ml-auto flex flex-row gap-2">
            <Button
              onClick={() => setIsEdit(false)}
              type="button"
              radius="full"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              color="primary"
              radius="full"
              isLoading={isLoading}
            >
              Save
            </Button>
          </div>
        </div>
      }
    >
      {children}
    </EditContent>
  );
};

export default EditContentPost;
