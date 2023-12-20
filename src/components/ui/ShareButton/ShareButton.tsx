'use client';

import { FC } from 'react';
import { Share } from 'src/assets/icons';
import { Button } from '@nextui-org/button';

const ShareButton: FC<{ url: string }> = ({ url }) => {
  const styleIcon = { style: { height: '1.1rem', width: '1.1rem' } };

  return (
    <Button
      variant="light"
      isIconOnly
      radius="full"
      className="p-0 text-default-400"
      onClick={() => {
        if (navigator.canShare())
          navigator.share({
            title: 'Share link',
            url: url,
          });
      }}
    >
      <Share {...styleIcon} />
    </Button>
  );
};

export default ShareButton;
