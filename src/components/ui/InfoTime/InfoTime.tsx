import { FC } from 'react';
import { Dot } from 'src/assets/icons';

type InfoTimeProps = {
  content: string;
  dotClassName?: string;
};

const InfoTime: FC<InfoTimeProps> = ({ content, dotClassName }) => {
  return (
    <div className="inline-flex items-center text-small text-default-400">
      <Dot className={dotClassName} />
      <h4>{content}</h4>
    </div>
  );
};

export default InfoTime;
