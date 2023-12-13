'use client';

import {
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  MDXEditor as MDXEditorOriginal,
  toolbarPlugin,
  type MDXEditorProps,
  BlockTypeSelect,
  DiffSourceToggleWrapper,
  diffSourcePlugin,
  codeBlockPlugin,
  InsertCodeBlock,
  codeMirrorPlugin,
  CodeMirrorEditor,
  InsertThematicBreak,
  Separator,
  linkPlugin,
  linkDialogPlugin,
  CreateLink,
  ListsToggle,
} from '@mdxeditor/editor';
import { UndoRedo } from '@mdxeditor/editor/plugins/toolbar/components/UndoRedo';
import { BoldItalicUnderlineToggles } from '@mdxeditor/editor/plugins/toolbar/components/BoldItalicUnderlineToggles';
import { Controller, useFormContext } from 'react-hook-form';
import '@mdxeditor/editor/style.css';
import './MDXEditor.css';
import { findInputError } from 'src/utils';
import { ErrorMessage } from 'src/components/ui/ErrorMessage';

const InitializedMDXEditor = ({
  name,
  diffMarkdown,
  ...props
}: { name: string; diffMarkdown?: string } & MDXEditorProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const { message, isInvalid } = findInputError(errors, name);

  return (
    <div>
      <div
        className={`overflow-hidden rounded-medium border-2 transition-all ${
          isInvalid
            ? 'border-danger'
            : 'border-default-200 focus-within:border-foreground'
        }`}
      >
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange } }) => (
            <MDXEditorOriginal
              autoFocus
              className="mdx-editor"
              onChange={onChange}
              contentEditableClassName="placeholder:text-foreground-500 !focus:border-default-500 prose max-w-none prose-a dark:prose-invert"
              plugins={[
                headingsPlugin({
                  allowedHeadingLevels: [1, 2, 3, 4],
                }),
                listsPlugin(),
                quotePlugin(),
                linkPlugin(),
                linkDialogPlugin(),
                codeBlockPlugin({
                  defaultCodeBlockLanguage: 'text',
                  codeBlockEditorDescriptors: [
                    {
                      priority: 100,
                      match: () => true,
                      Editor: CodeMirrorEditor,
                    },
                  ],
                }),
                codeMirrorPlugin({
                  codeBlockLanguages: {
                    text: 'text',
                  },
                }),
                thematicBreakPlugin(),
                markdownShortcutPlugin(),
                diffSourcePlugin({ diffMarkdown: diffMarkdown }),
                toolbarPlugin({
                  toolbarContents: () => (
                    <>
                      <DiffSourceToggleWrapper>
                        <UndoRedo />
                        <Separator />
                        <BoldItalicUnderlineToggles />
                        <Separator />
                        <ListsToggle />
                        <Separator />
                        <BlockTypeSelect />
                        <Separator />
                        <CreateLink />
                        <InsertCodeBlock />
                        <InsertThematicBreak />
                      </DiffSourceToggleWrapper>
                    </>
                  ),
                }),
              ]}
              {...props}
            />
          )}
        />
      </div>
      {isInvalid && <ErrorMessage message={message} />}
    </div>
  );
};

export default InitializedMDXEditor;
