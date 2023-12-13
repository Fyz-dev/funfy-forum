import { FC, ReactNode } from 'react';
import { Dot } from 'src/assets/icons';

type InfoTimeProps = {
  content: ReactNode;
  dotClassName?: string;
};

const InfoTime: FC<InfoTimeProps> = ({ content, dotClassName = '' }) => {
  return (
    <div className="inline-flex items-center text-small text-default-400">
      <Dot className={dotClassName} />
      <span>{content}</span>
    </div>
  );
};

export default InfoTime;
