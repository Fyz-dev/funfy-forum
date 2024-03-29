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
  frontmatterPlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
  imagePlugin,
  InsertImage,
} from '@mdxeditor/editor';
import { Controller, useFormContext } from 'react-hook-form';
import '@mdxeditor/editor/style.css';
import './MDXEditor.css';
import { findInputError } from 'src/utils';
import { ErrorMessage } from 'src/components/ui/ErrorMessage';
import { Button } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const InitializedMDXEditor = ({
  name,
  isLoading,
  onCancel,
  diffMarkdown,
  publicButton,
  withHideAnim = false,
  ...props
}: {
  name: string;
  isLoading?: boolean;
  onCancel?: () => void;
  diffMarkdown?: string;
  publicButton?: string;
  withHideAnim?: boolean;
} & MDXEditorProps) => {
  const {
    control,
    formState: { errors },
    clearErrors,
    setValue,
  } = useFormContext();
  const [isNull, setIsNull] = useState<boolean>(withHideAnim);
  const { message, isInvalid } = findInputError(errors, name);

  useEffect(() => {
    setValue(name, props.markdown);

    //eslint-disable-next-line
  }, [props.markdown]);

  return (
    <div>
      <div
        className={`overflow-hidden overflow-y-auto rounded-medium border-2 transition-all  ${
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
              onChange={e => {
                onChange(e);
                if (!withHideAnim) return;
                if (e.length === 0 && !isNull) {
                  setIsNull(true);
                  clearErrors(name);
                } else if (e.length !== 0 && isNull) setIsNull(false);
              }}
              contentEditableClassName="placeholder:text-foreground-500 !focus:border-default-500 max-w-none markdown"
              plugins={[
                headingsPlugin({
                  allowedHeadingLevels: [1, 2, 3],
                }),
                listsPlugin(),
                quotePlugin(),
                linkPlugin(),
                linkDialogPlugin(),
                frontmatterPlugin(),
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
                imagePlugin(),
                diffSourcePlugin({ diffMarkdown: diffMarkdown }),
                thematicBreakPlugin(),
                markdownShortcutPlugin(),
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
                        <InsertImage />
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
        <AnimatePresence>
          {publicButton && !isNull && (
            <motion.div
              initial="collapsed"
              animate="open"
              exit="collapsed"
              variants={{
                open: { opacity: 1, height: 'auto' },
                collapsed: { opacity: 0, height: 0 },
              }}
              transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
              className="flex"
            >
              <motion.div
                initial={{ translateY: '100%' }}
                animate={{ translateY: '0%' }}
                exit={{ translateY: '100%' }}
                transition={{
                  duration: 0.4,
                  type: 'spring',
                  stiffness: 400,
                  damping: 20,
                }}
                className="m-1 ml-auto mt-0 flex gap-2"
              >
                {onCancel && (
                  <Button type="reset" radius="full" onClick={onCancel}>
                    Cancel
                  </Button>
                )}
                <Button
                  color="primary"
                  type="submit"
                  radius="full"
                  isLoading={isLoading}
                >
                  {publicButton}
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {isInvalid && <ErrorMessage message={message} />}
    </div>
  );
};

export default InitializedMDXEditor;
