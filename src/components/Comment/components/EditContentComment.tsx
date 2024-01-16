'use client';

import { FC, ReactNode, useState } from 'react';
import { EditContent } from '../../EditContent';
import { MDXEditor } from 'src/components/MDXEditor';
import { IComment } from 'src/interface';
import { useEditContext } from 'src/context/Edit';
import { updateComment } from 'src/api/supabase';
import toast from 'react-hot-toast';
import { CommentSchema, CommentSchemaType } from 'src/validations/schemas';
import { useCommentsTreeContext } from 'src/context/CommentsTreeContext';

const EditContentComment: FC<{ children: ReactNode; comment: IComment }> = ({
  children,
  comment,
}) => {
  const { setIsEdit } = useEditContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    swr: { mutate },
  } = useCommentsTreeContext();

  return (
    <EditContent<CommentSchemaType>
      schemaValidate={CommentSchema}
      setIsLoading={setIsLoading}
      onSubmit={async data => {
        await toast.promise(
          updateComment({ content: data.comment, id: comment.id }),
          {
            loading: 'Saving...',
            success: 'Changes saved!',
            error: 'Changes not saved.',
          },
        );
        mutate();
      }}
      forEdit={
        <MDXEditor
          diffMarkdown={comment.content}
          markdown={comment.content}
          name="comment"
          publicButton="Save"
          isLoading={isLoading}
          onCancel={() => setIsEdit(false)}
        />
      }
    >
      {children}
    </EditContent>
  );
};

export default EditContentComment;
