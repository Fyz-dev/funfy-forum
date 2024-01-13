import { Spinner } from '@nextui-org/spinner';
import { FC } from 'react';

const Loading: FC = () => {
  return (
    <div className="inset-x-0 flex h-[calc(100vh-4.1rem)] items-center justify-center">
      <div className="m-3 flex items-center gap-10 max-md:gap-4">
        <Spinner color="primary" />
      </div>
    </div>
  );
};

export default Loading;
