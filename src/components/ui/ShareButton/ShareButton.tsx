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
        const shareData = {
          title: 'Share link',
          text: 'Funfy Forum is your go-to online community for lively discussions on various topics.',
          url: url,
        };

        if (navigator.canShare(shareData)) navigator.share(shareData);
      }}
    >
      <Share {...styleIcon} />
    </Button>
  );
};

export default ShareButton;
