'use client';

import { FC, ReactNode, useState } from 'react';
import { EditContent } from '../../EditContent';
import { MDXEditor } from 'src/components/MDXEditor';
import { IComment } from 'src/interface';
import { useEditContext } from 'src/context/Edit';
import { CommentSchema, CommentSchemaType } from 'src/validations/schemas';
import { updateComment } from 'src/api/supabase';

const EditContentComment: FC<{ children: ReactNode; comment: IComment }> = ({
  children,
  comment,
}) => {
  const { setIsEdit } = useEditContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <EditContent<CommentSchemaType>
      schemaValidate={CommentSchema}
      setIsLoading={setIsLoading}
      onSubmit={async data => {
        await updateComment({ content: data.comment, id: comment.id });
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
