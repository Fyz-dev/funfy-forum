import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { FC, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'src/assets/icons';
import { ErrorMessage } from '../ui/ErrorMessage';

interface DropzoneProps {
  onChange?: (file: File) => void;
  className?: string;
}

const Dropzone: FC<DropzoneProps> = ({ onChange, className = '' }) => {
  const [image, setImage] = useState<File & { preview: string }>();
  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      accept: {
        'image/*': [],
      },
      maxSize: 200000,
      onDrop: acceptedFiles => {
        const file = acceptedFiles[0];
        const withPreview = Object.assign(file, {
          preview: URL.createObjectURL(file),
        });

        setImage(withPreview);

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

  return (
    <AnimatePresence>
      <div>
        <div
          className={`relative flex min-h-[400px] select-none flex-col items-center justify-center overflow-hidden rounded-medium border-medium p-1 text-center text-default-500 transition-colors !duration-150 hover:border-default-400 ${className}`}
          {...getRootProps()}
        >
          <input className="focus:bg-red active:bg-red" {...getInputProps()} />
          {!image && (
            <>
              <Upload className="h-10 w-10" />
              {isDragActive ? (
                <motion.p key="drag-active" className="z-20" {...animate}>
                  Drop the image here...
                </motion.p>
              ) : (
                <motion.p key="drag-no-active" {...animate}>
                  Drag and drop avatar topic, or click to select image
                </motion.p>
              )}
            </>
          )}
          {image && (
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
              <Image
                src={image.preview}
                alt="Selected image"
                fill
                className="object-contain"
              />
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

export default Dropzone;
