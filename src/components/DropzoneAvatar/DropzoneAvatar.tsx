'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { FC, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'src/assets/icons';
import { ErrorMessage } from '../ui/ErrorMessage';

// type Avatar = File & { preview: string };

interface DropzoneProps {
  textDragNoActive: string;
  defaultUrlImage?: string;
  onChange?: (file: File) => void;
  className?: string;
}

const DropzoneAvatar: FC<DropzoneProps> = ({
  textDragNoActive,
  defaultUrlImage,
  onChange,
  className = '',
}) => {
  const [url, setUrl] = useState<string | undefined>(defaultUrlImage);
  // const [image, setImage] = useState<Avatar>();

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

  const error =
    fileRejections.length !== 0 ? fileRejections[0].errors[0] : undefined;

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

  const image = url ? (
    <Image
      priority={true}
      src={url}
      alt="Selected image"
      fill
      className="object-contain"
    />
  ) : null;

  useEffect(() => {
    return () => {
      if (url) URL.revokeObjectURL(url);
    };
  }, [url]);

  return (
    <AnimatePresence>
      <div>
        <div
          className={`relative flex max-h-full min-h-[200px] select-none flex-col items-center justify-center overflow-hidden rounded-medium border-medium p-1 text-center text-default-500 transition-colors !duration-150 hover:border-default-400 ${className}`}
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
            </>
          )}
        </div>
        <ErrorMessage
          message={
            error && error.code === 'file-too-large' ? error.message : ''
          }
        />
      </div>
    </AnimatePresence>
  );
};

export default DropzoneAvatar;
