import { FC } from 'react';
import Markdown, { Options } from 'react-markdown';
import rehypeRaw from 'rehype-raw';

const MDXRender: FC<{
  children?: Options['children'];
  className?: string;
}> = ({ children, className = '' }) => {
  return (
    <Markdown
      className={`markdown w-full min-w-full ${className}`}
      rehypePlugins={[rehypeRaw]}
    >
      {children}
    </Markdown>
  );
};

export default MDXRender;
