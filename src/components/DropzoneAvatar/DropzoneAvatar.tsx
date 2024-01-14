'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { FC, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Delete, Upload } from 'src/assets/icons';
import { Button } from '@nextui-org/button';
import { Image } from '@nextui-org/image';
import toast from 'react-hot-toast';
import { error } from 'console';

interface DropzoneProps {
  textDragNoActive: string;
  defaultUrlImage?: string;
  onChange?: (file: File | undefined) => void;
  className?: string;
}

const animate = {
  initial: { opacity: 0, scale: 0 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0 },
  transition: {
    delay: 0.1,
    duration: 0.2,
    type: 'spring',
    stiffness: 400,
    damping: 20,
  },
};

const DropzoneAvatar: FC<DropzoneProps> = ({
  textDragNoActive,
  defaultUrlImage,
  onChange,
  className = '',
}) => {
  const [url, setUrl] = useState<string | undefined>(defaultUrlImage);

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      accept: {
        'image/*': [],
      },
      maxSize: 200000,
      onDrop: acceptedFiles => {
        const file = acceptedFiles[0];

        if (url) URL.revokeObjectURL(url);
        setUrl(URL.createObjectURL(file));

        if (onChange) onChange(file);
      },
    });

  const image = url ? (
    <Image
      src={url}
      alt="Selected image"
      classNames={{
        img: 'object-contain',
        wrapper: 'overflow-hidden absolute z-0 h-full w-full flex',
      }}
    />
  ) : null;

  useEffect(() => {
    if (fileRejections.length !== 0)
      fileRejections.forEach(item => toast.error(item.errors[0].message));
  }, [fileRejections]);

  useEffect(() => {
    return () => {
      if (url) URL.revokeObjectURL(url);
    };
  }, [url]);

  return (
    <AnimatePresence>
      <div>
        <div
          className={`relative flex max-h-[200px] min-h-[200px] select-none flex-col items-center justify-center overflow-hidden rounded-medium border-medium text-center text-default-500 transition-colors !duration-150 hover:border-default-400 ${className}`}
          {...getRootProps()}
        >
          <input className="focus:bg-red active:bg-red" {...getInputProps()} />
          {!url && (
            <>
              <Upload className="h-10 w-10" />
              {isDragActive ? (
                <motion.p key="drag-active" className="z-20" {...animate}>
                  Drop the image here...
                </motion.p>
              ) : (
                <motion.p key="drag-no-active" {...animate}>
                  {textDragNoActive}
                </motion.p>
              )}
            </>
          )}
          {url && (
            <>
              <AnimatePresence>
                {isDragActive && (
                  <>
                    <motion.div className="z-20" {...animate}>
                      <Upload className="h-10 w-10" />
                    </motion.div>
                    <motion.p key="drag-active" className="z-20" {...animate}>
                      Drop the image here...
                    </motion.p>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.8 }}
                      exit={{ opacity: 0 }}
                      className="absolute z-10 h-full w-full bg-content1 opacity-80"
                    />
                  </>
                )}
              </AnimatePresence>
              {image}
              <motion.div className="absolute bottom-1 right-1" {...animate}>
                <Button
                  isIconOnly
                  variant="light"
                  size="sm"
                  radius="full"
                  type="button"
                  onClick={() => {
                    setUrl(undefined);
                    if (onChange) onChange(undefined);
                  }}
                >
                  <Delete className="text-default-500" />
                </Button>
              </motion.div>
            </>
          )}
        </div>
      </div>
    </AnimatePresence>
  );
};

export default DropzoneAvatar;
