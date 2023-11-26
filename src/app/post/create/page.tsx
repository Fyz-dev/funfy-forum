import { FC } from 'react';
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import { MDXEditor } from 'src/components/MDXEditor';
import { TagSwitch } from 'src/components/ui/TagSwitch';
import { SearchTopic } from 'src/components/SearchTopic';

const markdownContent: string = `
# Welcome

This is a **live demo** of MDXEditor with all default features on.

> The overriding design goal for Markdown’s formatting syntax is to make it as readable as possible.
> The idea is that a Markdown-formatted document should be publishable as-is, as plain text,
> without looking like it’s been marked up with tags or formatting instructions.

[— Daring Fireball](https://daringfireball.net/projects/markdown/).

In here, you can find the following markdown elements:

* Headings
* Lists
  * Unordered
  * Ordered
  * Check lists
  * And nested ;)
* Links
* Bold/Italic/Underline formatting
* Tables
* Code block editors
* And much more.

The current editor content is styled using the \`@tailwindcss/typography\` [plugin](https://tailwindcss.com/docs/typography-plugin).

## What can you do here?

This is a great location for you to test how editing markdown feels. If you have an existing markdown source, you can switch to source mode using the toggle group in the top right, paste it in there, and go back to rich text mode.

If you need a few ideas, here's what you can try:

1. Add your own code sample
2. Change the type of the headings
3. Insert a table, add a few rows and columns
4. Switch back to source markdown to see what you're going to get as an output
5. Test the diff feature to see how the markdown has changed
6. Add a frontmatter block through the toolbar button

## A code sample

MDXEditor embeds CodeMirror for code editing.

\`\`\`tsx
export default function App() {
  return (<div>Hello world</div>)
}
\`\`\`

## A live code example

The block below is a live React component. You can configure multiple live code presets that specify the available npm packages and the default imports. You can also specify a default component that will be rendered in the live code block.

\`\`\`jsx live
export default function App() {
  return (<div>
  <p>This is a live React component, that's being previewed in codesandbox. </p>
  <p>Editing it will update the fenced codeblock in the markdown.</p>
  </div>)
}
\`\`\`

## A table

Play with the table below - add rows, columns, change column alignment. When editing,
you can navigate the cells with \`enter\`, \`shift+enter\`, \`tab\` and \`shift+tab\`.
`;

const CreatePage: FC = () => {
  return (
    <div className="m-5 flex justify-center gap-5">
      {/* overflow-auto - нужен для работы скроллинга в MDXEditor. p-10 -m-10 box-content - для починки теней. */}
      <main className="-m-10 box-content flex w-full max-w-page justify-center overflow-auto p-10">
        <Card className="relative w-full p-1">
          <CardHeader>
            <h1 className="mr-auto">Create a post</h1>
            <TagSwitch text="NSFW" />
          </CardHeader>
          <CardBody className="flex gap-3 ">
            <Input variant="bordered" placeholder="Add a title..."></Input>
            <MDXEditor
              diffMarkdown={markdownContent}
              markdown={markdownContent}
              placeholder="Add a desription..."
            />
          </CardBody>
          <CardFooter>
            <div className="ml-auto flex gap-2">
              <Button radius="full" content="Public">
                Cancel
              </Button>
              <Button radius="full" color="primary" content="Public">
                Public
              </Button>
            </div>
          </CardFooter>
        </Card>
      </main>
      <section className="flex w-80 shrink-0 flex-col gap-5">
        <SearchTopic />
        {/* <TopicCard topic={} /> */}
      </section>
    </div>
  );
};

export default CreatePage;
