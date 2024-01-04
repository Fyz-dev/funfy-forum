import { FC } from 'react';
import { BoxOpen } from 'src/assets/icons';

const Empty: FC<{ description?: string }> = ({ description }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 self-center">
      <BoxOpen className="h-16 w-16" />
      <div className="flex flex-col items-center">
        <span className="flex text-xl">It&lsquo;s empty here</span>
        {description && (
          <span className="flex text-large text-default-500">
            {description}
          </span>
        )}
      </div>
    </div>
  );
};

export default Empty;
