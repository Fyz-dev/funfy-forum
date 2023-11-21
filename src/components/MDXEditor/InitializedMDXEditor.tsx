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
} from '@mdxeditor/editor';
import { UndoRedo } from '@mdxeditor/editor/plugins/toolbar/components/UndoRedo';
import { BoldItalicUnderlineToggles } from '@mdxeditor/editor/plugins/toolbar/components/BoldItalicUnderlineToggles';
import '@mdxeditor/editor/style.css';
import styles from './MDXEditor.module.css';

const InitializedMDXEditor = ({ ...props }: MDXEditorProps) => {
  return (
    <div className="overflow-hidden rounded-medium border-2 border-default-200 focus-within:border-foreground">
      <MDXEditorOriginal
        autoFocus
        className={styles.editor}
        contentEditableClassName="!text-foreground-500 !focus:border-default-500"
        plugins={[
          headingsPlugin(),
          listsPlugin(),
          quotePlugin(),
          thematicBreakPlugin(),
          markdownShortcutPlugin(),
          diffSourcePlugin(),
          toolbarPlugin({
            toolbarContents: () => (
              <>
                <DiffSourceToggleWrapper>
                  <UndoRedo />
                  <BoldItalicUnderlineToggles />
                  <BlockTypeSelect />
                </DiffSourceToggleWrapper>
              </>
            ),
          }),
        ]}
        {...props}
      />
    </div>
  );
};

export default InitializedMDXEditor;
